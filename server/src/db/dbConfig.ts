import { ConnectionPool } from 'mssql/msnodesqlv8';

const config = {
  server: 'TEMP-DEV-LAPTOP',
  database: 'covid_data',
  options: {
    trustedConnection: true, // Use Windows authentication
    trustServerCertificate: true
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // Idle time in milliseconds before a connection is closed
  },
};

export const pool = new ConnectionPool(config);

export const connectToDatabase = async (): Promise<void> => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};
