import React, { useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import 'components/print/PrintPage.css';

import { StoreState } from 'reducers';
import { resetPrint, updatePrint } from 'actions';
import ProgressBar from 'components/ProgressBar';

const PrintPage: React.FC<RouteChildrenProps> = ({ history }) => {
  const { printStatus, printerInCheck } = useSelector(
    (state: StoreState) => state.photostrips,
  );
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (printStatus >= 0 && printStatus < 100 && !printerInCheck) {
      const updateTimout = setTimeout(() => dispatch(updatePrint()), 1000);
      return () => clearInterval(updateTimout);
    } else if (printStatus >= 100 && !showComplete) {
      setShowComplete(true);
    } else if (printStatus >= 100 && showComplete) {
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
          <div className="print-text">Printing in progress...</div>
          <ProgressBar completed={printStatus > 100 ? 100 : printStatus} />
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
