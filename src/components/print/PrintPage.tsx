import React, { useEffect, useState } from 'react';

import 'components/print/PrintPage.css';
import { RouteChildrenProps } from 'react-router-dom';

function useCountDown(
  startCount: number,
  startCounting: boolean = true,
): [number, any] {
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

  const resetCount = (resetVal: number): void => {
    setCountDown(resetVal);
    setIsCounting(true);
  };

  return [countDown, resetCount];
}

const backwards = [3, 2, 1, 0];
const PrintPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const [countDown] = useCountDown(10);
  const bullets = '.'.repeat(backwards[countDown % 4]);

  useEffect(() => {
    if (countDown === 0) {
      history.push('/');
    }
  }, [countDown, history]);

  return <div className="print-text">Printing in progress{bullets}</div>;
};
export default PrintPage;
