export default async function handler(req:any, res: any) {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/AAPL?range=1y&interval=1mo"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
}