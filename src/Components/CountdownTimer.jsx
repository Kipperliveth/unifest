// src/CountdownTimer.js
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetTime = new Date('2024-09-13T23:00:00Z').getTime();
    const currentTime = new Date().getTime();

    if (currentTime >= targetTime) {
      return {}; // Return empty object if current time is equal to or past target time
    }

    const  difference = targetTime - currentTime;
    let timeLeft = {  Days: 0,
      Hrs: 0,
      Min: 0,
      Sec: 0,};

     if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Min: Math.floor((difference / 1000 / 60) % 60),
        Sec: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <span key={interval}>
        {formatTime(timeLeft[interval])} {interval}{' '}
      </span>
    );
  });

  return (
    <div className="countdown">
      {timerComponents.length ? timerComponents : <span>Today!</span>}
      
    </div>
  );
};

export default CountdownTimer;
