import React from 'react';
const TimerFormatter = ({ seconds, defaultText = "0 Sec" }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return <>{seconds > 0 ? formatTime(seconds) : defaultText}</>;
};

export default TimerFormatter;