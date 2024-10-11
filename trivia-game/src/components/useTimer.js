// useTimer.js
import { useState, useEffect, useRef } from 'react';

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const isRunningRef = useRef(false); // Keep track of whether the timer is running

  const startTimer = (duration) => {
    setTimeLeft(duration);
    if (isRunningRef.current) return; // Prevent multiple intervals from running

    isRunningRef.current = true; // Mark timer as running
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          isRunningRef.current = false; // Reset running state
          return 0; // Timer ends
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    isRunningRef.current = false; // Reset running state
  };

  useEffect(() => {
    return () => {
      stopTimer(); // Cleanup on unmount
    };
  }, []);

  return { timeLeft, startTimer, stopTimer };
};

export default useTimer;
