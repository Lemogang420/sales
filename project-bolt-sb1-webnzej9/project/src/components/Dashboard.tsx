import React, { useState, useEffect } from 'react';
import SummaryCards from './SummaryCards';
import CategoryBreakdown from './CategoryBreakdown';
import PaymentMethodAnalysis from './PaymentMethodAnalysis';
import ProductPerformance from './ProductPerformance';
import Header from './Header';
import { processData } from '../utils/dataProcessor';
import { Order } from '../types';
import { orders } from '../data/orders';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const processedData = processData(orders);
      setData(processedData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SummaryCards data={data} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CategoryBreakdown data={data} />
          <PaymentMethodAnalysis data={data} />
        </div>
        
        <div className="mt-6">
          <ProductPerformance data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;