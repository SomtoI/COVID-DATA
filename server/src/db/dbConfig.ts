import { ConnectionPool } from 'mssql/msnodesqlv8';

const config = {
  server: 'TEMP-DEV-LAPTOP',
  database: 'covid_data',
  options: {
    trustedConnection: true, // Use Windows authentication
    trustServerCertificate: true
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
