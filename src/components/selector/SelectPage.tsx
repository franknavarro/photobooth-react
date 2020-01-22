import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { StoreState } from 'reducers';
import { clearImages } from 'actions';

const SelectPage: React.FC<RouteComponentProps> = ({ history }) => {
  const photostrips = useSelector((state: StoreState) => state.photostrips);
  const dispatch = useDispatch();

  const clearOut = (): void => {
    dispatch(clearImages());
  };

  return (
    <>
      <img
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        src={photostrips.color}
        alt="colored-strip"
      />
      <button onClick={clearOut}>Back to start</button>
    </>
  );
};

export default SelectPage;
