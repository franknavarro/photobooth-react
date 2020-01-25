import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import 'components/print/PrintPage.css';

import { StoreState } from 'reducers';
import { resetPrint, updatePrint } from 'actions';

const PrintPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const printState = useSelector(
    (state: StoreState) => state.photostrips.printStatus,
  );
  const dispatch = useDispatch();
  console.log('updated in DOM: ', printState);

  useEffect(() => {
    if (printState >= 0 && printState < 10) {
      const updateTimout = setTimeout(() => dispatch(updatePrint()), 1000);
      return () => clearInterval(updateTimout);
    } else if (printState >= 10) {
      dispatch(resetPrint());
      history.push('/');
    }
  }, [printState, history, dispatch]);

  return <div className="print-text">Printing in progress: {printState}</div>;
};
export default PrintPage;
