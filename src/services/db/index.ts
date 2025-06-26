import { environment } from '@/lib/env';
import { drizzle } from 'drizzle-orm/node-postgres';

const CONNECTION_STRING = `postgresql://${environment.POSTGRES_USER}:${environment.POSTGRES_PASSWORD}@${environment.POSTGRES_HOST}:${environment.POSTGRES_PORT}/${environment.POSTGRES_DB}`
export const db = drizzle(CONNECTION_STRING);
