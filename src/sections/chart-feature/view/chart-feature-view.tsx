
import type { ChartOptions } from 'src/components/chart';

import { useState, useEffect,  } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWebsiteVisits } from 'src/sections/overview/analytics-website-visits';

// ----------------------------------------------------------------------

interface ChartData {
  colors?: string[];
  categories?: string[];
  series: {
    name: string;
    data: number[];
  }[];
  options?: ChartOptions;
}

export function ChartFeatureView() {

  const [data, setData] = useState<ChartData|null>(null);
  const	[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("/api/chart");
        const result = await response.json();

        if (result.chart && result.chart.result) {
          const stockData = result.chart.result[0];
          const timestamps = stockData.timestamp;
          const prices = stockData.indicators.quote[0].close.map((price:number) => 
            price ? parseFloat(price.toFixed(2)) : 0
          );

          const categories: string = timestamps.map((timestamp:number) =>
            new Date(timestamp * 1000).toLocaleString("en-US", { month: "short" })
          );

          setData({
            categories: [...new Set(categories)],
            series: [
              { name: "AAPL Prices", data: prices.slice(0, 9) },
              { name: "AAPL Adjusted", data: prices.slice(1, 10) },
            ],
          });
        }
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
      <Grid container spacing={1}>
        <Grid xs={12}>
          {data &&
            <AnalyticsWebsiteVisits
              title="AAPL Stock Prices"
              subheader="Last 12 Months"
              chart={data}
            />
          }
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
