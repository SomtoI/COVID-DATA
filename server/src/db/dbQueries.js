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

  if (category === "continents") {
    query = `
    SELECT
    dbo.covid_viz_data.continent,
    location,
    dbo.covid_viz_data.date,
    ${metric},
    total_metrics.total_metric
  FROM
    dbo.covid_viz_data
  JOIN (
    SELECT
      dbo.covid_viz_data.continent,
      dbo.covid_viz_data.date,
      SUM(CAST(${metric} AS FLOAT)) AS total_metric
    FROM
      dbo.covid_viz_data
    WHERE
      continent IN (@baseValue, @comparisonValue)
    GROUP BY 
      continent,
      date
  ) AS total_metrics ON dbo.covid_viz_data.continent = total_metrics.continent AND dbo.covid_viz_data.date = total_metrics.date
  ORDER BY
    location,
    date
  
    `;

    params = [baseValue];
  } else if (category === "countries") {
    if (comparisonValue) {
      query = `
        SELECT
          c.continent,
          cd.date,
          cd.${metric} AS base_value,
          cd2.${metric} AS comparison_value
        FROM
          dbo.covid_viz_data cd
        JOIN
          dbo.covid_viz_data cd2 ON cd.date = cd2.date
        JOIN
          location c ON cd.location = c.name
        WHERE
          c.name IN (${baseValue}, ${comparisonValue})
        ORDER BY
          c.name,
          cd.date
      `;

      params = [baseValue, comparisonValue];
    } else {
      query = `
        SELECT
          c.continent,
          cd.date,
          cd.${metric} AS base_value,
          NULL AS comparison_value
        FROM
          dbo.covid_viz_data cd
        JOIN
          location c ON cd.location = c.name
        WHERE
          c.name = @baseValue
        ORDER BY
          c.name,
          cd.date
      `;

      params = [baseValue];
    }
  }

  try {
    console.log("trying to query");
    const result = await pool
      .request()
      .input("baseValue", baseValue)
      .input("comparisonValue", comparisonValue)
      .query(query);

    return result.recordset;
  } catch (error) {
    throw new Error(`Error executing the query: ${error}`);
  }
};
