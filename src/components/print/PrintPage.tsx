import React, { useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import 'components/print/PrintPage.css';

import { StoreState } from 'reducers';
import { resetPrint, updatePrint } from 'actions';
import Spinner from 'components/Spinner';

const PrintPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const { printStatus, printerInCheck } = useSelector(
    (state: StoreState) => state.photostrips,
  );
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('print status: ', printStatus);
    if (printStatus !== '' && !printerInCheck) {
      console.log('Updating Print in 1 sec');
      const updateTimout = setTimeout(() => dispatch(updatePrint()), 1000);
      return () => clearInterval(updateTimout);
    } else if (printStatus === '' && !showComplete) {
      console.log('We just completed');
      setShowComplete(true);
    } else if (printStatus === '' && showComplete) {
      console.log('Prepare to redirect');
      setTimeout(() => {
        dispatch(resetPrint());
        history.push('/');
      }, 7500);
    }
  }, [printStatus, printerInCheck, history, dispatch, showComplete]);


  return (
    <div className="flex-container">
      {!showComplete ? (
        <>
          <div className="print-text">{printStatus === 'Waiting...' ? 'Warming up the rocket ship... and the printer.' : 'Printing in progress...'}</div>
          <Spinner />
        </>
      ) : (
        <>
          <div className="print-text">Printing Complete!</div>
          <div className="print-text">Pick up photos</div>
          <div className="finger-point animate-left">&#9758;</div>
        </>
      )}
    </div>
  );
};
export default PrintPage;
