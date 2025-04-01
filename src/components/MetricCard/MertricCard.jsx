import React from 'react';
import './MetricCard.css';

const MetricCard = ({
  title,  
  value,
  semiCircular = false,
  progressColor = '#1976d2',
  max = 100,
  link = 'javascript:void(0)',
}) => {
  

  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  const rotationAngle = percentage === 0 ? -180 : -180 + (percentage * 1.8);
  
  return (
    <a href={link} className="metric-card-link">
      <div className="metric-card">
        {semiCircular ? (
          // Semicircular progress indicator
          <div className="semicircular-progress">
            <div className="semicircle-container">
              <div className="semicircle-background"></div>
              <div 
                className="semicircle-progress" 
                style={{ transform: `rotate(${1}deg)`, borderTopColor: progressColor }}
              >
                <div></div>
              </div>

            </div>
            <div className="semicircular-value">{value}</div>
            <div className="semicircular-title">{title}</div>
          </div>
        ) : (
          // Linear progress indicator
          <div className="linear-progress">
            <div className="linear-title">{title}</div>
            <div className="value-container">
              <div className="primary-value">{value}</div>
              {max > 0 && <div className="max-value">{max}</div>}
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: progressColor 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

export default MetricCard;