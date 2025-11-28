import { GoogleGenAI, Type } from "@google/genai";
import { DisasterReport } from "../types";

// Declare process for environment variables
declare const process: { env: { GEMINI_API_KEY?: string } };

const apiKey = process.env.GEMINI_API_KEY;

// We use the recommended model for complex JSON tasks
const modelName = "gemini-2.5-flash";

interface Coordinates {
  lat: number;
  lon: number;
  name?: string;
}

async function getCoordinates(query: string): Promise<Coordinates | null> {
    // Check if query is "lat, lon" format (from Geolocation button)
    const coordParts = query.split(',').map(p => p.trim());
    if (coordParts.length === 2) {
        const lat = parseFloat(coordParts[0]);
        const lon = parseFloat(coordParts[1]);
        if (!isNaN(lat) && !isNaN(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
             return { lat, lon, name: "Current Location" };
        }
    }

    try {
        // Open-Meteo Geocoding API (Free, no key required)
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return {
                lat: data.results[0].latitude,
                lon: data.results[0].longitude,
                name: `${data.results[0].name}, ${data.results[0].country}`
            };
        }
    } catch (e) {
        console.warn("Geocoding failed, falling back to AI interpretation", e);
    }
    return null;
}

async function getRealTimeAQI(lat: number, lon: number): Promise<number | null> {
    try {
        // Open-Meteo Air Quality API (Free, no key required)
        // We request US AQI to match standard reporting
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`);
        const data = await response.json();
        if (data.current && data.current.us_aqi !== undefined && data.current.us_aqi !== null) {
            return data.current.us_aqi;
        }
    } catch (e) {
        console.warn("AQI fetch failed, falling back to AI estimation", e);
    }
    return null;
}

export const analyzeLocationRisks = async (location: string): Promise<DisasterReport> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  // 1. Attempt to fetch real-time data
  const coords = await getCoordinates(location);
  let realAQI: number | null = null;
  let resolvedLocation = location;

  if (coords) {
      realAQI = await getRealTimeAQI(coords.lat, coords.lon);
      if (coords.name && coords.name !== "Current Location") {
          resolvedLocation = coords.name;
      }
  }

  const ai = new GoogleGenAI({ apiKey });

  // 2. Construct Prompt with Real Data injection
  let prompt = `
    Analyze the natural disaster risks for the location: "${resolvedLocation}".
  `;

  if (realAQI !== null) {
      prompt += `
    CRITICAL CONTEXT: The current real-time measured Air Quality Index (AQI) is ${realAQI} (US Standard).
    You MUST use this exact value (${realAQI}) for the AQI section of the report. 
    Determine the status and health implications based on this real value.
      `;
  } else {
      prompt += `
    Estimate the current Air Quality Index (AQI) based on typical conditions or recent knowledge for this region.
      `;
  }

  prompt += `
    Provide a comprehensive safety report including:
    1. AQI details (Value, Status, Health Implications).
    2. A list of potential natural disasters (Flood, Earthquake, Wildfire, Hurricane, Tornado, etc.) relevant to this geography, with probability percentages and severity.
    3. Identify specific or general safe zones/shelter types suitable for this location.
    4. Simulated historical disaster frequency data for the last 5 years (2020-2024) for visualization.
    5. A list of essential safety precautions for the highest risk disaster.
    
    Be realistic based on the location's geography and climate history.
  `;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          location: { type: Type.STRING },
          timestamp: { type: Type.STRING, description: "ISO date string of analysis" },
          aqi: {
            type: Type.OBJECT,
            properties: {
              value: { type: Type.NUMBER },
              status: { type: Type.STRING },
              healthImplications: { type: Type.STRING },
            }
          },
          overallRisk: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Critical"] },
          disasters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                probability: { type: Type.NUMBER },
                severity: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Critical"] },
                description: { type: Type.STRING },
              }
            }
          },
          safeZones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Shelter", "High Ground", "Medical", "Open Space"] },
              }
            }
          },
          history: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING },
                incidentCount: { type: Type.NUMBER },
              }
            }
          },
          precautions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["location", "aqi", "overallRisk", "disasters", "safeZones", "history", "precautions"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No data received from Gemini");
  }

  const data = JSON.parse(response.text) as DisasterReport;

  // Enforce the real AQI value if we have it, just in case the model hallucinated a different number
  if (realAQI !== null) {
      data.aqi.value = realAQI;
  }
  
  // Use the nicely formatted location name from geocoding if available
  if (resolvedLocation && resolvedLocation !== "Current Location") {
      data.location = resolvedLocation;
  }

  return data;
};