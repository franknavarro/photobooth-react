import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { RouteComponentProps } from 'react-router-dom';

import TextContainer from 'components/TextContainer';

import 'components/webcam/WebcamPage.css';

import { addPhoto, createStrips } from 'actions';
import { useCountDown } from 'resources/useCountDown';
import { photoCount, imageSizePixels } from 'resources/constants';

const videoConstraints = {
  facingMode: 'user',
  width: imageSizePixels[0],
  height: imageSizePixels[1],
};
console.log(imageSizePixels);

enum countDownStates {
  initial,
  forSnapShot,
  forImage,
}

const cameraCount: number = 5;
const pictureCount: number = 2;

const WebcamPic: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const [countDown, resetCountDown] = useCountDown(cameraCount + 1, false);
  const [countState, setCountState] = useState(countDownStates.initial);
  const [recentCapture, setCaptured] = useState('');
  const [imageCount, setImageCount] = useState(0);

  const webcamRef = React.useRef<any>(null);

  // Wait for Keyboard press to start count down
  const startCountDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setCountState(countDownStates.forSnapShot);
        resetCountDown();
        window.removeEventListener('keydown', startCountDown);
      }
    },
    [resetCountDown],
  );
  useEffect(() => {
    window.addEventListener('keydown', startCountDown);
    return () => window.removeEventListener('keydown', startCountDown);
  }, [startCountDown]);

  // Count down reached zero figure out what to do next
  useEffect(() => {
    // Switch to show image instead of webcam
    if (countDown < 1 && countState === countDownStates.forSnapShot) {
      const imgSrc = webcamRef.current.getScreenshot();
      const newImageCount = imageCount + 1;

      dispatch(addPhoto(imgSrc, newImageCount));
      setImageCount(newImageCount);
      setCountState(countDownStates.forImage);
      setCaptured(imgSrc);
      resetCountDown(pictureCount);
    } else if (countDown < 1 && countState === countDownStates.forImage) {
      if (imageCount < photoCount) {
        setCountState(countDownStates.forSnapShot);
        resetCountDown(cameraCount);

        // Last image finished displaying
      } else {
        dispatch(createStrips());
        history.push('/select');
      }
    }
  }, [dispatch, countDown, countState, history, imageCount, resetCountDown]);

  let imageOnTop = false;
  if (countState === countDownStates.forImage) {
    imageOnTop = true;
  }

  const getBottomText = (): string => {
    switch (countState) {
      case countDownStates.initial:
        return 'Push Button to Start';

      case countDownStates.forImage:
        if (imageCount < photoCount) {
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
    return `Photo ${imageNum} of ${photoCount}`;
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
