import React, { useEffect } from 'react';
import { useCountDown } from 'resources/useCountDown';

import 'components/print/PrintPage.css';
import { RouteChildrenProps } from 'react-router-dom';

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
