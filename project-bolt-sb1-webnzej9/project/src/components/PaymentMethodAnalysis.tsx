import React, { useMemo } from 'react';
import { Order } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PaymentMethodAnalysisProps {
  data: Order[];
}

const PaymentMethodAnalysis: React.FC<PaymentMethodAnalysisProps> = ({ data }) => {
  const paymentData = useMemo(() => {
    const payments = data.reduce((acc, order) => {
      const { paymentMode, amount, profit } = order;
      if (!acc[paymentMode]) {
        acc[paymentMode] = { amount: 0, profit: 0, count: 0 };
      }
      acc[paymentMode].amount += amount;
      acc[paymentMode].profit += profit;
      acc[paymentMode].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; profit: number; count: number }>);
    
    return Object.entries(payments).map(([name, { amount, profit, count }]) => ({
      name,
      sales: amount,
      profit,
      count,
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method Analysis</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paymentData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            />
            <Legend />
            <Bar dataKey="sales" fill="#3B82F6" name="Sales" />
            <Bar dataKey="profit" fill="#10B981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {paymentData.map((payment, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-800">{payment.name}</p>
            <div className="flex justify-between mt-1">
              <div>
                <p className="text-xs text-gray-500">Sales</p>
                <p className="text-sm font-semibold">${payment.sales.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Orders</p>
                <p className="text-sm font-semibold">{payment.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodAnalysis;