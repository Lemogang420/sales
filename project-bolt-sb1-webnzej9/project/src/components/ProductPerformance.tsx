import React, { useMemo, useState } from 'react';
import { Order } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductPerformanceProps {
  data: Order[];
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    return ['All', ...uniqueCategories];
  }, [data]);

  const subCategoryData = useMemo(() => {
    const filteredData = selectedCategory === 'All' 
      ? data 
      : data.filter(item => item.category === selectedCategory);

    const subCategories = filteredData.reduce((acc, order) => {
      const { subCategory, amount, profit, quantity } = order;
      if (!acc[subCategory]) {
        acc[subCategory] = { amount: 0, profit: 0, quantity: 0, count: 0 };
      }
      acc[subCategory].amount += amount;
      acc[subCategory].profit += profit;
      acc[subCategory].quantity += quantity;
      acc[subCategory].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; profit: number; quantity: number; count: number }>);
    
    return Object.entries(subCategories)
      .map(([name, { amount, profit, quantity, count }]) => ({
        name,
        sales: amount,
        profit,
        quantity,
        count,
        profitMargin: (profit / amount) * 100,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10); // Top 10 sub-categories
  }, [data, selectedCategory]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Product Performance</h2>
        <div className="mt-3 sm:mt-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={subCategoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'profitMargin') return [`${value.toFixed(1)}%`, 'Profit Margin'];
                return [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#3B82F6" name="Sales" />
            <Bar dataKey="profit" fill="#10B981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {subCategoryData.slice(0, 6).map((product, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <h3 className="font-medium text-gray-800">{product.name}</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Sales</p>
                <p className="text-sm font-semibold">${product.sales.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Profit</p>
                <p className="text-sm font-semibold">${product.profit.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-semibold">{product.quantity} units</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Profit Margin</p>
                <p className={`text-sm font-semibold ${product.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.profitMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPerformance;