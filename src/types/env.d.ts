export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPO_PUBLIC_GOOGLE_MAP_API_KEY: string;
        }
    }
}
