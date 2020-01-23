import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { RouteComponentProps } from 'react-router-dom';

import TextContainer from 'components/TextContainer';

import 'components/webcam/WebcomPage.css';

import { updateStrip, createStrips } from 'actions';

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
  const [recentCapture, setCaptured] = useState('');
  const [imageCount, setImageCount] = useState(0);

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
      const newImageCount = imageCount + 1;

      dispatch(updateStrip(imgSrc, newImageCount));
      setImageCount(newImageCount);
      setCountState(countDownStates.forImage);
      setCaptured(imgSrc);
      setCountDown(pictureCount);
    } else if (countDown < 1 && countState === countDownStates.forImage) {
      if (imageCount < maxPhotos) {
        setCountState(countDownStates.forSnapShot);
        setCountDown(cameraCount);

        // Last image finished displaying
      } else {
        dispatch(createStrips());
        history.push('/select');
      }
    }
  }, [dispatch, countDown, countState, history, imageCount]);

  let imageOnTop = false;
  if (countState === countDownStates.forImage) {
    imageOnTop = true;
  }

  const getBottomText = (): string => {
    switch (countState) {
      case countDownStates.initial:
        return 'Push Button to Start';

      case countDownStates.forImage:
        if (imageCount < maxPhotos) {
          return 'Get Ready for the next one!';
        }
        return 'Looking goooooooood!!!!';

      default:
        if (countDown > cameraCount) {
          return 'Get Ready!';
        }
        return `${countDown}`;
    }
  };

  const getTopText = (): string => {
    if (countState === countDownStates.initial) {
      return 'Photobooth';
    }

    const imageNum =
      countState === countDownStates.forImage ? imageCount : imageCount + 1;
    return `Photo ${imageNum} of ${maxPhotos}`;
  };

  return (
    <div className="flex-container">
      <TextContainer className="text-container--top">
        {getTopText()}
      </TextContainer>
      <div className="video-container">
        <img
          src={recentCapture}
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
      <TextContainer className="text-container--bottom">
        {getBottomText()}
      </TextContainer>
    </div>
  );
};

export default WebcamPic;
