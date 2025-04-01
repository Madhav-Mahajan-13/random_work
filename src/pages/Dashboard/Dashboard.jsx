import React from 'react';
import MetricCard from '../../components/MetricCard/MertricCard';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data for metrics
  const metrics = [
    {
      id: 1,
      title: 'New Alerts',
      value: 0,
      max: 0,
      progressColor: '#1976d2',
      semiCircular: false,
      link: '/alerts'
    },
    {
      id: 2,
      title: 'New Messages',
      value: 9,
      max: 1230,
      progressColor: '#1976d2',
      semiCircular: false,
      link: '/messages'
    },
    {
      id: 3,
      title: 'Overdue Tasks',
      value: 492,
      max: 492,
      progressColor: '#1a237e', // Darker blue for the "Overdue Tasks" card
      semiCircular: false,
      link: '/tasks'
    },
    {
      id: 4,
      title: "Today's Appointments",
      value: 10,
      max: 45,
      progressColor: '#1976d2',
      semiCircular: false,
      link: '/appointments'
    },
    {
      id: 5,
      title: 'Interactive Communication',
      value: 1,
      max: 10,
      progressColor: '#1976d2',
      semiCircular: true,
      link: '/communication'
    },
    {
      id: 6,
      title: "My Productivity (Today's Time)",
      value: 5,
      max: 8,
      progressColor: '#1976d2',
      semiCircular: true,
      link: '/productivity'
    }
  ];

  return (
    <div className="metrics-dashboard">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          max={metric.max}
          progressColor={metric.progressColor}
          semiCircular={metric.semiCircular}
          link={metric.link}
        />
      ))}
    </div>
  );
};

export default Dashboard;