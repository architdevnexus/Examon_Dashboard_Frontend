import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 4900 },
];

export default function SalesChart() {
  return (
    <div className="w-full h-80 bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Sales Overview
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// import React from "react";

export function ContentPieChart({ stats }) {
  const COLORS = [
    "#6366F1",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#F97316",
    "#EC4899",
  ];

  const data = [
    { name: "Mentors", value: stats.mentors },
    { name: "Blogs", value: stats.blogs },
    { name: "Courses", value: stats.courses },
    { name: "Batches", value: stats.batches },
    { name: "PYQs", value: stats.pyqs },
    { name: "Quizzes", value: stats.quizzes },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Content Composition
      </h2> */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ContentDistributionChart({ stats }) {
  const data = [
    { name: "Mentors", count: stats.mentors },
    { name: "Blogs", count: stats.blogs },
    { name: "Courses", count: stats.courses },
    { name: "Batches", count: stats.batches },
    { name: "PYQs", count: stats.pyqs },
    { name: "Quizzes", count: stats.quizzes },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Content Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366F1" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
