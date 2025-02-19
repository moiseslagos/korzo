/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/chart", async (req, res) => {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/AAPL?range=1y&interval=1mo"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
});

export default app;