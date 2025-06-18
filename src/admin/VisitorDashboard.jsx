import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { FiGlobe, FiMapPin, FiMonitor, FiClock } from 'react-icons/fi';
import Loader from '../Ui/Loader';

export default function VisitorDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error) setVisitors(data);
      setLoading(false);
    };

    fetchVisitors();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiGlobe className="text-blue-500" />
        Visitor Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<FiGlobe />}
          title="Total Visitors"
          value={visitors.length}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<FiMapPin />}
          title="Countries"
          value={new Set(visitors.map((v) => v.country)).size}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<FiMonitor />}
          title="Devices"
          value={new Set(visitors.map((v) => v.user_agent)).size}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<FiClock />}
          title="Today"
          value={visitors.filter((v) => isToday(new Date(v.created_at))).length}
          color="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Visitor Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                IP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                  {visitor.ip_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-green-500" />
                    {visitor.city
                      ? `${visitor.city}, ${visitor.country}`
                      : visitor.country}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {visitor.user_agent?.split(' ')[0] || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(visitor.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper components
function StatCard({ icon, title, value, color }) {
  return (
    <div className={`${color} p-4 rounded-lg flex items-center gap-3`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
