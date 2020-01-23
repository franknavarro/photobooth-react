import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextContainer from 'components/TextContainer';
import { StoreState } from 'reducers';
import { resetAndPrint } from 'actions';

import 'components/selector/SelectPage.css';

const SelectPage: React.FC = () => {
  const photostrips = useSelector((state: StoreState) => state.photostrips.all);
  const dispatch = useDispatch();

  const printThisPhoto = (print: string): void => {
    dispatch(resetAndPrint(print));
  };

  return (
    <div className="flex-container">
      <TextContainer className="text-container--top">
        Please tap print color
      </TextContainer>
      <div className="button-container">
        {photostrips.map(({ type, pic }) => (
          <button onClick={() => printThisPhoto(pic)} className="button">
            <img
              className="button-image"
              key={type}
              style={{ maxWidth: '50%', maxHeight: '50%', padding: '5px' }}
              src={pic}
              alt={type}
            />
            <div className="button-text">{type}</div>
          </button>
        ))}
      </div>
      <TextContainer className="text-container--top">
        Auto-Selecting "Color" in 10
      </TextContainer>
    </div>
  );
};

export default SelectPage;
