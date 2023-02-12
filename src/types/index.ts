export interface Env {
  FIREBASE_PROJECT_ID: string;
  FIREBASE_API_KEY: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_SERVICE_ACCOUNT_EMAIL: string;
  MONGO_APP_ID: string;
  MONGO_DB_NAME: string;
  MONGO_API_KEY: string;
  MONGO_DATA_SOURCE: string;
}

export enum CollectionName {
  favorite = 'favorite',
  measurement = 'measurement',
  measurementsInTarget = 'measurementsInTarget',
  post = 'post',
  reaction = 'reaction',
  user = 'users',
}
