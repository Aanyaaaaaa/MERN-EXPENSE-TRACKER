import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Statistics from './components/Statistics';
import Login from './components/Login';
import Register from './components/Register';
import { Plus, TrendingUp, List, BarChart3, LogOut, User } from 'lucide-react';

// Set default axios headers
axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios interceptor for authentication
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  // Authentication functions
  const login = async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { token: newToken, user: userInfo } = response.data;
      
      setToken(newToken);
      setUser(userInfo);
      localStorage.setItem('token', newToken);
      
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setExpenses([]);
    setCategories([]);
    setStats({});
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`/expenses?month=${currentMonth}&year=${currentYear}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`/expenses/stats/summary?month=${currentMonth}&year=${currentYear}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Add expense
  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post('/expenses', expenseData);
      setExpenses([response.data, ...expenses]);
      fetchStats();
      return true;
    } catch (error) {
      console.error('Error adding expense:', error);
      return false;
    }
  };

  // Update expense
  const updateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`/expenses/${id}`, expenseData);
      setExpenses(expenses.map(exp => exp._id === id ? response.data : exp));
      fetchStats();
      return true;
    } catch (error) {
      console.error('Error updating expense:', error);
      return false;
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
      fetchStats();
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      return false;
    }
  };

  // Add category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post('/categories', categoryData);
      setCategories([...categories, response.data]);
      return true;
    } catch (error) {
      console.error('Error adding category:', error);
      return false;
    }
  };

  // Load data when user is authenticated
  useEffect(() => {
    if (user && token) {
      const loadData = async () => {
        await Promise.all([fetchExpenses(), fetchCategories(), fetchStats()]);
      };
      loadData();
    }
  }, [user, token, currentMonth, currentYear]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If not authenticated, show auth pages
  if (!user || !token) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register onRegister={register} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={setCurrentMonth}
          onYearChange={setCurrentYear}
          user={user}
          onLogout={logout}
        />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  stats={stats}
                  expenses={expenses.slice(0, 5)}
                  categories={categories}
                />
              } 
            />
            <Route 
              path="/expenses" 
              element={
                <ExpenseList 
                  expenses={expenses}
                  categories={categories}
                  onUpdate={updateExpense}
                  onDelete={deleteExpense}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <ExpenseForm 
                  categories={categories}
                  onSubmit={addExpense}
                  onAddCategory={addCategory}
                />
              } 
            />
            <Route 
              path="/statistics" 
              element={
                <Statistics 
                  stats={stats}
                  expenses={expenses}
                  categories={categories}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => window.location.href = '/add'}
            className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
          <div className="flex justify-around py-2">
            <button
              onClick={() => window.location.href = '/'}
              className="flex flex-col items-center p-2 text-primary-600"
            >
              <TrendingUp size={20} />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => window.location.href = '/expenses'}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-primary-600"
            >
              <List size={20} />
              <span className="text-xs mt-1">Expenses</span>
            </button>
            <button
              onClick={() => window.location.href = '/statistics'}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-primary-600"
            >
              <BarChart3 size={20} />
              <span className="text-xs mt-1">Stats</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600"
            >
              <LogOut size={20} />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App; 