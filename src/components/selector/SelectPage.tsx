import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from 'reducers';
import { clearStrips } from 'actions';

const SelectPage: React.FC = () => {
  const photostrips = useSelector((state: StoreState) => state.photostrips.all);
  console.log('RENDER');
  console.log(photostrips);
  const dispatch = useDispatch();

  const clearOut = (): void => {
    dispatch(clearStrips());
  };

  return (
    <>
      {photostrips.map(({ type, pic }) => (
        <img
          key={type}
          style={{ maxWidth: '50%', maxHeight: '50%', padding: '5px' }}
          src={pic}
          alt={type}
        />
      ))}
      <button onClick={clearOut}>Back to start</button>
    </>
  );
};

export default SelectPage;
