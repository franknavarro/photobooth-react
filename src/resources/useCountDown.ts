import { useState, useEffect } from 'react';

export const useCountDown = (
  startCount: number,
  startCounting: boolean = true,
): [number, any] => {
  const [countDown, setCountDown] = useState(startCount);
  const [isCounting, setIsCounting] = useState(startCounting);

  useEffect(() => {
    if (isCounting && countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCounting(false);
    }
  }, [isCounting, countDown]);

  const resetCount = (resetVal: number = startCount): void => {
    setCountDown(resetVal);
    setIsCounting(true);
  };

  return [countDown, resetCount];
};
