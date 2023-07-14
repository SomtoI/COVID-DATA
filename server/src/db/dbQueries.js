import { pool } from "./dbConfig";

export const getData = async () => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT location, continent
      FROM YourTable
      ORDER BY location, continent;

      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'YourTable'
        AND COLUMN_NAME NOT IN ('iso_code', 'location', 'continent', 'date');
    `);

    const countries = result.recordsets[0].map((row) => row.Country);
    const continents = result.recordsets[0].map((row) => row.Continent);
    const metrics = result.recordsets[1].map((row) => row.COLUMN_NAME);

    return {
      categories: {
        countries,
        continents,
      },
      metrics,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
