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
  const { category, baselineValue, comparisonValue, metric } = req.query;

  // Call the getQuery function with the received parameters
  const result = await getQuery(
    category,
    baselineValue,
    metric,
    comparisonValue
  );

  // Handle the result and send the response
  result
    .then((data) => {
      console.log(data);
      res.json({ success: true, data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "Error retrieving data" });
    });
});

export default router;
