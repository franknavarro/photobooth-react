import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from 'reducers';

const SelectPage: React.FC = () => {
  const photostrips = useSelector((state: StoreState) => state.photostrips);

  return (
    <>
      <img src={photostrips.color} alt="colored-strip" />
      <Link to="/">Back to start</Link>
    </>
  );
};

export default SelectPage;
