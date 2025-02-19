// eslint-disable-next-line import/no-extraneous-dependencies
import yahooFinance from "yahoo-finance2";
import { useState, useEffect,  } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  ResponsiveContainer
} from 'recharts';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

interface ChartData {
  date: string;
  price: number;
}

export function ChartFeatureView() {

  const [data, setData] = useState<ChartData[]>([]);
  const	[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(
          "/api/chart"
        );
        const result = await response.json();

        if (result.chart && result.chart.result) {
          const stockData = result.chart.result[0];
          const timestamps = stockData.timestamp;
          const prices = stockData.indicators.quote[0].close;

          const chartData = timestamps.map((timestamp: number, index:number) => ({
            date: new Date(timestamp * 1000).toISOString().split("T")[0],
            price: prices[index],
          }));

          setData(chartData);
        }
        // const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=X7SLLIC2L59AMB9Q');
        // const resData = await response.json();
        // console.log('Fetch data:', resData);
        // const timeSeries = resData["Monthly Time Series"];
        // if(timeSeries) {
        //   const chartData = Object.keys(timeSeries)
        //                     .slice(0, 12)
        //                     .map((date) => ({
        //                       date,
        //                       price: parseFloat(timeSeries[date]["4. close"]),
        //                     }))
        //                     .reverse();
        //   setData(chartData);
        // }
        setLoading(false);
      } catch (error) {
        console.error('Fetch data error:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Data:', data);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Chart Feature
        </Typography>
      </Box>

      <h2>AAPL Stock Prices (Last 12 Months)</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(0, 7)} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Bar dataKey="price" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardContent>
  );
}
