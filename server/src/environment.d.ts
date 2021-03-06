declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      HOST: string;
      PORT: string | number;
      CORS_ORIGIN: string;

      DB_CLIENT: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
