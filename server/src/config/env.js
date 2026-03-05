import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverEnvPath = resolve(__dirname, '../../.env');
const cwdEnvPath = resolve(process.cwd(), '.env');

dotenv.config({
  path: existsSync(cwdEnvPath) ? cwdEnvPath : serverEnvPath,
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  databaseUrl: process.env.DATABASE_URL,
  dbSsl: process.env.DB_SSL === 'true',
  dbSslRejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

if (!env.databaseUrl) {
  throw new Error('Missing DATABASE_URL in environment variables.');
}

if (!env.jwtSecret) {
  throw new Error('Missing JWT_SECRET in environment variables.');
}

export default env;
