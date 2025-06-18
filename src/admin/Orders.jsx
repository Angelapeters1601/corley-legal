import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiCreditCard,
  FiCalendar,
  FiSearch,
  FiDownload,
  FiFilter,
} from 'react-icons/fi';

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy orders data
  const orders = [
    {
      id: 'ORD-1001',
      client: 'John Smith',
      date: '2023-11-15',
      amount: 1250,
      status: 'completed',
      method: 'credit_card',
      service: 'Contract Review',
    },
    {
      id: 'ORD-1002',
      client: 'Acme Corp',
      date: '2023-11-14',
      amount: 3500,
      status: 'processing',
      method: 'bank_transfer',
      service: 'Business Incorporation',
    },
    {
      id: 'ORD-1003',
      client: 'Sarah Johnson',
      date: '2023-11-12',
      amount: 750,
      status: 'refunded',
      method: 'credit_card',
      service: 'Consultation',
    },
    {
      id: 'ORD-1004',
      client: 'David Wilson',
      date: '2023-11-10',
      amount: 2200,
      status: 'completed',
      method: 'paypal',
      service: 'Estate Planning',
    },
    {
      id: 'ORD-1005',
      client: 'TechStart Inc',
      date: '2023-11-08',
      amount: 5000,
      status: 'processing',
      method: 'bank_transfer',
      service: 'IP Protection',
    },
    {
      id: 'ORD-1006',
      client: 'Emily Chen',
      date: '2023-11-05',
      amount: 1500,
      status: 'completed',
      method: 'credit_card',
      service: 'Employment Contract',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusFilters = [
    { id: 'all', name: 'All Orders' },
    { id: 'completed', name: 'Completed' },
    { id: 'processing', name: 'Processing' },
    { id: 'refunded', name: 'Refunded' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return <FiCreditCard className="mr-1" />;
      case 'bank_transfer':
        return '🏦';
      case 'paypal':
        return '🔵';
      default:
        return <FiDollarSign className="mr-1" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 p-6 bg-white rounded-xl shadow-sm"
        >
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiDollarSign className="mr-3 text-purple-500" />
            Orders & Payments
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all client transactions
          </p>
        </motion.div>

        {/* Stats and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(
              orders.reduce((sum, order) => sum + order.amount, 0)
            )}
            icon={<FiDollarSign />}
            color="bg-purple-100 text-purple-600"
          />
          <StatCard
            title="Completed Orders"
            value={orders.filter((o) => o.status === 'completed').length}
            icon="✅"
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="Processing"
            value={orders.filter((o) => o.status === 'processing').length}
            icon="🔄"
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Refunded"
            value={orders.filter((o) => o.status === 'refunded').length}
            icon="↩️"
            color="bg-red-100 text-red-600"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              {statusFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1 text-gray-400" />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {getPaymentIcon(order.method)}
                        {order.method.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center mt-6">
            <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No orders found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Download Button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <FiDownload className="mr-2" />
            Export as CSV
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Stat card component
function StatCard({ title, value, icon, color }) {
  return (
    <div className={`${color} p-4 rounded-xl flex items-center`}>
      <div className="text-2xl mr-3">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default Orders;
