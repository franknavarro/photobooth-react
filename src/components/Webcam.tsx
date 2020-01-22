import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Webcam from 'react-webcam';

import './Webcom.css';
import { addImage, createStrips } from '../actions';
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

const cameraCount: number = 1;
const pictureCount: number = 1;
const maxPhotos: number = 3;

const WebcamPic: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const [countDown, setCountDown] = useState(cameraCount + 1);
  const [countState, setCountState] = useState(countDownStates.initial);

  const images = useSelector((state: StoreState) => state.images);
  const getRecentImage = () => images[images.length - 1];

  const webcamRef = React.useRef<any>(null);

  // Wait for Keyboard press to start count down
  const startCountDown = useCallback((event: KeyboardEvent) => {
    if (event.key === ' ') {
      setCountState(countDownStates.forSnapShot);
      window.removeEventListener('keydown', startCountDown);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('keydown', startCountDown);
    return () => window.removeEventListener('keydown', startCountDown);
  }, [startCountDown]);

  // Update the count down timer every second
  useEffect(() => {
    if (countState !== countDownStates.initial) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  // Count down reached zero figure out what to do next
  useEffect(() => {
    // Switch to show image instead of webcam
    if (countDown < 1 && countState === countDownStates.forSnapShot) {
      const imgSrc = webcamRef.current.getScreenshot();
      dispatch(addImage(imgSrc));
      setCountState(countDownStates.forImage);
      setCountDown(pictureCount);
      console.log(images.length);
      // Last image will display start creation of photostrips
      if (images.length >= maxPhotos - 1) {
        console.log('kick off creation of photostrips');
        dispatch(createStrips());
      }
      // Switch to show webcam instead of image
    } else if (countDown < 1 && countState === countDownStates.forImage) {
      if (images.length < maxPhotos) {
        setCountState(countDownStates.forSnapShot);
        setCountDown(cameraCount);
        // Last image finished displaying
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
        if (countDown > cameraCount) {
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
