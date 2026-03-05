import pg from 'pg';
import env from './env.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.dbSsl
    ? {
        rejectUnauthorized: env.dbSslRejectUnauthorized,
      }
    : false,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL error:', error);
});

export const query = (text, params = []) => pool.query(text, params);

export default pool;
