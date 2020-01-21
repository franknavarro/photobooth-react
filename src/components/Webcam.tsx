import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Webcam from 'react-webcam';

import './Webcom.css';
import { addImage } from '../actions';
import { StoreState } from '../reducers';
import { RouteComponentProps } from 'react-router-dom';

const videoConstraints = {
  facingMode: 'user',
};

enum countDownStates {
  initial,
  forSnapShot,
  forImage,
}

const startCountAt: number = 5;
const maxPhotos: number = 3;

const WebcamPic: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const [countDown, setCountDown] = useState(startCountAt + 1);
  const [countState, setCountState] = useState(countDownStates.initial);
  const resetCountDown = () => {
    setCountDown(startCountAt);
  };
  const startCountDown = useCallback((event: KeyboardEvent) => {
    if (event.key === ' ') {
      setCountState(countDownStates.forSnapShot);
      window.removeEventListener('keydown', startCountDown);
    }
  }, []);

  const images = useSelector((state: StoreState) => state.images);
  const getRecentImage = () => images[images.length - 1];

  const webcamRef = React.useRef<any>(null);

  useEffect(() => {
    window.addEventListener('keydown', startCountDown);
    return () => window.removeEventListener('keydown', startCountDown);
  }, [startCountDown]);

  useEffect(() => {
    if (countState !== countDownStates.initial) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  useEffect(() => {
    if (countDown < 1 && countState === countDownStates.forSnapShot) {
      const imgSrc = webcamRef.current.getScreenshot();
      dispatch(addImage(imgSrc));
      setCountState(countDownStates.forImage);
      resetCountDown();
    } else if (countDown < 1 && countState === countDownStates.forImage) {
      if (images.length < maxPhotos) {
        setCountState(countDownStates.forSnapShot);
        resetCountDown();
      } else {
        history.push('/select');
      }
    }
  }, [dispatch, countDown, countState, images, history]);

  let imageOnTop = false;
  if (countState === countDownStates.forImage) {
    imageOnTop = true;
  }

  const getBottomText = () => {
    switch (countState) {
      case countDownStates.initial:
        return 'Push Button to Start';

      case countDownStates.forImage:
        if (images.length < maxPhotos) {
          return 'Get Ready for the next one!';
        }
        return 'Looking goooooooood!!!!';

      default:
        if (countDown > startCountAt) {
          return 'Get Ready!';
        }
        return countDown;
    }
  };

  const getTopText = () => {
    if (countState === countDownStates.initial) {
      return 'Photobooth';
    }
    const imageNum =
      countState === countDownStates.forImage
        ? images.length
        : images.length + 1;
    return `Photo ${imageNum} of ${maxPhotos}`;
  };

  return (
    <div className="flex-container">
      <div className="text-container">{getTopText()}</div>
      <div className="video-container">
        <img
          src={getRecentImage()}
          alt={'screenshot'}
          className={imageOnTop ? 'on-top' : 'hidden'}
        />
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className={!imageOnTop ? 'on-top' : 'hidden'}
        />
      </div>
      <div className="text-container">{getBottomText()}</div>
    </div>
  );
};

export default WebcamPic;
