import express from "express";
//import { getData } from "../db/dataQueries";
import { getData } from "../db/dataController";

const router = express.Router();
/*
router.get("/", async (req, res) => {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/
router.get("/", getData);

export default router;
