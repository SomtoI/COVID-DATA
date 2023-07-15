import { pool } from "./dbConfig";

export const getData = async () => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT location, continent
      FROM dbo.covid_viz_data
      ORDER BY location, continent;

      SELECT name
      FROM sys.columns
      WHERE object_id = OBJECT_ID('dbo.covid_viz_data')
        AND name NOT IN ('iso_code', 'location', 'continent', 'date');
    `);

    const countries = result.recordsets[0].map((row) => row.location);
    const continents = result.recordsets[0].map((row) => row.continent);
    const metrics = result.recordsets[1].map((row) => row.name);

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

export const getQuery = async (
  category,
  baseValue,
  metric,
  comparisonValue
) => {
  let query;
  let params;

  if (category === "continent") {
    query = `
      SELECT
        continent,
        date,
        ${metric} AS base_value,
        NULL AS comparison_value
      FROM
        CovidData
      WHERE
        continent = @baseValue
      ORDER BY
        continent,
        date
    `;

    params = {
      baseValue,
    };
  } else if (category === "country") {
    if (comparisonValue) {
      query = `
        SELECT
          c.continent,
          cd.date,
          cd.${metric} AS base_value,
          cd2.${metric} AS comparison_value
        FROM
          CovidData cd
        JOIN
          CovidData cd2 ON cd.date = cd2.date
        JOIN
          Country c ON cd.location = c.name
        WHERE
          c.name IN (@baseValue, @comparisonValue)
        ORDER BY
          c.name,
          cd.date
      `;

      params = {
        baseValue,
        comparisonValue,
      };
    } else {
      query = `
        SELECT
          c.continent,
          cd.date,
          cd.${metric} AS base_value,
          NULL AS comparison_value
        FROM
          CovidData cd
        JOIN
          Country c ON cd.location = c.name
        WHERE
          c.name = @baseValue
        ORDER BY
          c.name,
          cd.date
      `;

      params = {
        baseValue,
      };
    }
  }

  try {
    const result = await pool.request().input(params).query(query);
    return result.recordset;
  } catch (error) {
    throw new Error(`Error executing the query: ${error}`);
  }
};
