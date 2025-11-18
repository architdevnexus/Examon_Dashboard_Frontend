import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CommissionChart = ({ breakdown }) => {
  const data = [
    { name: "Commissions", value: breakdown.commissions },
    { name: "Ads", value: breakdown.ads },
    { name: "Premium", value: breakdown.premium_subscriptions },
  ];

  const COLORS = ["#4ade80", "#60a5fa", "#facc15"];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommissionChart;
