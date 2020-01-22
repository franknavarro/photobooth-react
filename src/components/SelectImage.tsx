import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../reducers';
import { Link } from 'react-router-dom';

const SelectImage: React.FC = () => {
  const photostrips = useSelector((state: StoreState) => state.photostrips);

  return (
    <>
      <img src={photostrips.color} alt="colored-strip" />
      <Link to="/">Back to start</Link>
    </>
  );
};

export default SelectImage;
