import React, { useState, useEffect } from 'react';

const SimpleTimer = ({ isActive, onTimerUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    if (isActive) {
      if (onTimerUpdate) {
        onTimerUpdate(seconds);
      }
      
      const timeoutId = setTimeout(() => {
        const newSeconds = seconds + 1;
        setSeconds(newSeconds);
        
        if (onTimerUpdate) {
          onTimerUpdate(newSeconds);
        }
      }, 1000);
      
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setSeconds(0);
      if (onTimerUpdate) {
        onTimerUpdate(0);
      }
    }
  }, [isActive, seconds, onTimerUpdate]);
  
  return null;
};

export default SimpleTimer;
