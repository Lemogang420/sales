import React, { useMemo } from 'react';
import { Order } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryBreakdownProps {
  data: Order[];
}

const COLORS = ['#3B82F6', '#0EA5E9', '#F97316', '#10B981'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">Sales: ${payload[0].value.toFixed(2)}</p>
        <p className="text-sm text-green-600">Profit: ${payload[0].payload.profit.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ data }) => {
  const categoryData = useMemo(() => {
    const categories = data.reduce((acc, order) => {
      const { category, amount, profit } = order;
      if (!acc[category]) {
        acc[category] = { amount: 0, profit: 0, count: 0 };
      }
      acc[category].amount += amount;
      acc[category].profit += profit;
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; profit: number; count: number }>);
    
    return Object.entries(categories).map(([name, { amount, profit, count }]) => ({
      name,
      value: amount,
      profit,
      count,
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {categoryData.map((category, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium" style={{ color: COLORS[index % COLORS.length] }}>
              {category.name}
            </p>
            <p className="text-lg font-bold">${category.value.toFixed(2)}</p>
            <p className="text-xs text-gray-500">{category.count} orders</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;