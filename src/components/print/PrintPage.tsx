import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import 'components/print/PrintPage.css';

import { StoreState } from 'reducers';
import { resetPrint, updatePrint } from 'actions';

const PrintPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const { printStatus, printerInCheck } = useSelector(
    (state: StoreState) => state.photostrips,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(printerInCheck);
    if (printStatus >= 0 && printStatus < 100 && !printerInCheck) {
      const updateTimout = setTimeout(() => dispatch(updatePrint()), 1000);
      return () => clearInterval(updateTimout);
    } else if (printStatus >= 100) {
      dispatch(resetPrint());
      history.push('/');
    }
  }, [printStatus, printerInCheck, history, dispatch]);

  return <div className="print-text">Printing in progress: {printStatus}</div>;
};
export default PrintPage;
