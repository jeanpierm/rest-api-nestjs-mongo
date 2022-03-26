import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  name: string;
  user: string;
  password: string;
  admin: boolean;
  srv: boolean;
  ssl: boolean;
  debug: boolean;
  options: string;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DATABASE_HOST || 'localhost:27017',
    name: process.env.DATABASE_NAME || 'nest',
    user: process.env.DATABASE_USER || null,
    password: process.env.DATABASE_PASSWORD || null,
    admin: process.env.DATABASE_ADMIN === 'true' || false,
    srv: process.env.DATABASE_SRV === 'true' || false,
    ssl: process.env.DATABASE_SSL === 'true' || false,
    debug: process.env.DATABASE_DEBUG === 'true' || false,
    options: process.env.DATABASE_OPTIONS,
  }),
);
