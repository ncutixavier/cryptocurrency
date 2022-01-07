import React  from "react";
import {LineChart,ResponsiveContainer,Legend, Tooltip,Line,XAxis,YAxis,CartesianGrid} from 'recharts';

const BarChart = () => {
 
  const cryptodata = [
    {
      name: 'Bitcoin',
      coin: 11,
      usd: 120
    },
    {
      name: 'Coinbase',
      coin: 15,
      usd: 150
    },
    {
      name: 'Ethereum',
      coin: 5,
      usd: 100
    },
    
  ];

  return (
    <div>
  <ResponsiveContainer width="100%" aspect={3}>
  <LineChart data={cryptodata}>
  <CartesianGrid />
  <XAxis dataKey="name"
    interval={'preserveStartEnd'} />
  <YAxis></YAxis>
  <Legend />
  <Tooltip />
  <Line dataKey="coin"
    stroke="black" activeDot={{ r: 8 }} />
  <Line dataKey="usd"
    stroke="#0000FF" activeDot={{ r: 8 }} />
</LineChart>      
</ResponsiveContainer>
    </div>
  );
};

export default BarChart;
