declare module '@google/genai' {
  export class GoogleGenAI {
    constructor(config: { apiKey: string });
    models: {
      generateContent(params: {
        model: string;
        contents: string;
        config: {
          responseMimeType: string;
          responseSchema: any;
        };
      }): Promise<{ text: string }>;
    };
  }
  
  export enum Type {
    OBJECT = 'object',
    STRING = 'string',
    NUMBER = 'number',
    ARRAY = 'array'
  }
}