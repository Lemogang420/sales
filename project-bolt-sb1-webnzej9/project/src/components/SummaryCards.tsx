import React, { useMemo } from 'react';
import { CircleDollarSign, TrendingUp, ShoppingCart, CreditCard } from 'lucide-react';
import { Order } from '../types';

interface SummaryCardsProps {
  data: Order[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const metrics = useMemo(() => {
    const totalSales = data.reduce((sum, order) => sum + order.amount, 0);
    const totalProfit = data.reduce((sum, order) => sum + order.profit, 0);
    const totalOrders = data.length;
    const averageOrderValue = totalSales / totalOrders;

    return {
      totalSales: totalSales.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      totalOrders,
      averageOrderValue: averageOrderValue.toFixed(2),
      profitMargin: ((totalProfit / totalSales) * 100).toFixed(1),
    };
  }, [data]);

  const cards = [
    {
      title: 'Total Sales',
      value: `$${metrics.totalSales}`,
      icon: <CircleDollarSign className="h-7 w-7 text-blue-500" />,
      change: '+12.5%',
      isPositive: true,
    },
    {
      title: 'Total Profit',
      value: `$${metrics.totalProfit}`,
      icon: <TrendingUp className="h-7 w-7 text-green-500" />,
      change: `${metrics.profitMargin}%`,
      isPositive: parseFloat(metrics.profitMargin) > 0,
    },
    {
      title: 'Total Orders',
      value: metrics.totalOrders.toString(),
      icon: <ShoppingCart className="h-7 w-7 text-purple-500" />,
      change: '+8.2%',
      isPositive: true,
    },
    {
      title: 'Avg. Order Value',
      value: `$${metrics.averageOrderValue}`,
      icon: <CreditCard className="h-7 w-7 text-orange-500" />,
      change: '+3.1%',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
            </div>
            <div className="p-2 rounded-full bg-gray-100">{card.icon}</div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {card.change} 
              <span className="text-gray-500 text-xs ml-1">from last month</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;