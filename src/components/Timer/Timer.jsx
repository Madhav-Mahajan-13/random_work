import React, { useState, useEffect } from 'react';

const Timer = ({ isActive, initialValue = 0, onTimerUpdate }) => {
  const [time, setTime] = useState(initialValue);
  
  useEffect(() => {
    let lastTimeStamp;
    let requestId;
    
    const updateTimer = (currentTime) => {
      if (isActive) {
        if (lastTimeStamp) {
          const deltaTime = Math.floor((currentTime - lastTimeStamp) / 1000);
          if (deltaTime >= 1) {
            const newTime = time + deltaTime;
            setTime(newTime);
            if (onTimerUpdate) {
              onTimerUpdate(newTime);
            }
            lastTimeStamp = currentTime;
          }
        } else {
          lastTimeStamp = currentTime;
        }
        requestId = requestAnimationFrame(updateTimer);
      }
    };
    
    if (isActive) {
      requestId = requestAnimationFrame(updateTimer);
    }
    
    if (!isActive) {
      setTime(initialValue);
    }

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [isActive, initialValue, time, onTimerUpdate]);

  return null;
};

export default Timer;
