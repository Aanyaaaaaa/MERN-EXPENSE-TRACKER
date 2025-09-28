import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, IndianRupee, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const Statistics = ({ stats, expenses, categories }) => {
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || '#6366f1';
  };

  // Prepare data for pie chart
  const pieData = Object.entries(stats.categoryStats || {}).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: getCategoryColor(category)
  }));

  // Prepare data for bar chart (daily expenses)
  const dailyData = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((acc, exp) => {
      const date = new Date(exp.date).toLocaleDateString();
      if (acc[date]) {
        acc[date] += exp.amount;
      } else {
        acc[date] = exp.amount;
      }
      return acc;
    }, {});

  const barData = Object.entries(dailyData)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7); // Last 7 days

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Statistics & Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalIncome || 0)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.totalExpenses || 0)}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Balance</p>
              <p className={`text-2xl font-bold ${(stats.balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(stats.balance || 0)}
              </p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <IndianRupee className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {(stats.expenseCount || 0) + (stats.incomeCount || 0)}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Calendar className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown Pie Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense by Category</h2>
          {pieData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No expense data to display</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Daily Expenses Bar Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Expenses (Last 7 Days)</h2>
          {barData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No expense data to display</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Bar dataKey="amount" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Detailed Category Breakdown */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Category Breakdown</h2>
        {Object.keys(stats.categoryStats || {}).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No expenses to categorize</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(stats.categoryStats || {})
              .sort(([,a], [,b]) => b - a)
              .map(([category, amount]) => {
                const percentage = ((amount / (stats.totalExpenses || 1)) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      ></div>
                      <span className="font-medium text-gray-900">{category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{formatCurrency(amount)}</p>
                      <p className="text-sm text-gray-500">{percentage}% of total</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Income vs Expenses Comparison */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-900">Income</span>
            </div>
            <span className="font-semibold text-green-600">{formatCurrency(stats.totalIncome || 0)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="font-medium text-gray-900">Expenses</span>
            </div>
            <span className="font-semibold text-red-600">{formatCurrency(stats.totalExpenses || 0)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary-500"></div>
              <span className="font-medium text-gray-900">Net Balance</span>
            </div>
            <span className={`font-semibold ${(stats.balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(stats.balance || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 