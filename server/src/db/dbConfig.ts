import { ConnectionPool } from 'mssql';

const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
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
