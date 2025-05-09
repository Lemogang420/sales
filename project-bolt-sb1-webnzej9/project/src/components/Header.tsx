import React from 'react';
import { BarChart3, LayoutDashboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            <h1 className="ml-2 text-xl font-semibold text-gray-800">Sales Analytics Dashboard</h1>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors duration-150 ease-in-out">
                <LayoutDashboard className="h-5 w-5 mr-1" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;