import express from "express";
import { getData, getQuery } from "../db/dbQueries";
//import { getData } from "../db/dataController";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getGraphData", async (req, res) => {
  const { category, baseValue, metric, comparisonValue } = req.query;

  try {
    // Call the getQuery function with the received parameters
    const result = await getQuery(category, baseValue, metric, comparisonValue);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
