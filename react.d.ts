declare module 'react' {
  export function useState<T>(initialState: T): [T, (value: T) => void];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export default any;
}