import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';

import TextContainer from 'components/TextContainer';
import { StoreState } from 'reducers';
import { resetAndPrint } from 'actions';

import 'components/selector/SelectPage.css';
import { useCountDown } from 'resources/useCountDown';

const SelectPage: React.FC<RouteChildrenProps> = () => {
  const photostrips = useSelector((state: StoreState) => state.photostrips.all);
  const firstOption = photostrips[0];

  const [countDown] = useCountDown(20);

  const dispatch = useDispatch();

  const printThisPhoto = (print: string): void => {
    console.log('Sending off to printer');
    dispatch(resetAndPrint(print));
  };

  useEffect(() => {
    if (countDown === 0) {
      console.log('Auto Selecting...');
      dispatch(resetAndPrint(firstOption.pic));
    }
  }, [countDown, firstOption, dispatch]);

  return (
    <div className="flex-container">
      <TextContainer className="text-container--top">
        Please tap print color
      </TextContainer>
      <div className="button-container">
        {photostrips.map(({ type, pic }, index) => (
          <button
            onClick={() => printThisPhoto(pic)}
            className="button"
            key={index}
          >
            <img
              className="button-image"
              style={{ maxWidth: '50%', maxHeight: '50%', padding: '5px' }}
              src={pic}
              alt={type}
            />
            <div className="button-text">{type}</div>
          </button>
        ))}
      </div>
      <TextContainer className="text-container--top">
        Auto-Selecting "{firstOption.type}" in {countDown}
      </TextContainer>
    </div>
  );
};

export default SelectPage;
