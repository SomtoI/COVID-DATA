import { Request, Response } from "express";

// Mock data for demonstration purposes
const mockData = {
  categories: {
    countries: ["Country 1", "Country 2", "Country 3"],
    continents: ["Continent 1", "Continent 2", "Continent 3"],
  },
  metrics: ["Metric 1", "Metric 2", "Metric 3"],
};

const resultset = [
  { column1: "value1", column2: "value2" },
  { column1: "value3", column2: "value4" },
  // More rows...
];

export const getData = (req, res) => {
  try {
    // Simulate asynchronous data retrieval
    setTimeout(() => {
      res.status(200).json(mockData);
    }, 1000);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTable = (req, res) => {
  try {
    setTimeout(() => {
      const mockResponse = {
        success: true,
        data: resultset,
      };

      res.status(200).json(mockResponse);
    }, 1000);
  } catch (error) {
    console.error("Error querying data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
