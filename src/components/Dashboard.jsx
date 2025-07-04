import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashData } from '../redux/dashDataSlice';
import {
  BarChart, Bar, PieChart, Pie, Tooltip, Cell, XAxis, YAxis, Legend, ResponsiveContainer,
} from 'recharts';
import './styles/components.scss';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57', '#a4de6c'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.dashData);

  useEffect(() => {
    dispatch(fetchDashData());
  }, [dispatch]);

  const countByField = (field) => {
    const counts = {};
    data.forEach((item) => {
      const key = item[field];
      if (key) {
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const statusData = countByField('Status');
  const typeData = countByField('Device Type');
  const amcStatusData = countByField('AMC/CMC Status');
  const completionStatusData = countByField('Completion Status');

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Total Devices Available With Us</h2>

      <div className="card highlight-card">
        <h1>{data.length}</h1>
        <p>Total Devices</p>
      </div>

      <div className="grid-cards">
        <ChartCard title="Device Status Distribution">
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Device Type Breakdown">
          <PieChart>
            <Pie
              data={typeData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {typeData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="AMC/CMC Status Overview">
          <PieChart>
            <Pie
              data={amcStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {amcStatusData.map((_, index) => (
                <Cell key={index} fill={COLORS[(index + 2) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

       
      </div>
    </div>
  );
}

// Reusable ChartCard component
function ChartCard({ title, children }) {
  return (
    <div className="card chart-card">
      <h6>{title}</h6>
      <ResponsiveContainer width="100%" height={250}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
