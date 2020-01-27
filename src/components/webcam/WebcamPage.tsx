import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { RouteComponentProps } from 'react-router-dom';

import TextContainer from 'components/TextContainer';
import Spinner from 'components/Spinner';

import 'components/webcam/WebcamPage.css';

import { addPhoto, createStrips } from 'actions';
import { useCountDown } from 'resources/useCountDown';
import { photoCount, imageSizePixels } from 'resources/constants';
import { feelGoods } from 'resources/language';

const videoConstraints = {
  facingMode: 'user',
  width: imageSizePixels[0],
  height: imageSizePixels[1],
};

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
  const [randomSaying, setRandomSaying] = useState(0);

  const webcamRef = React.useRef<any>(null);

  // Wait for Keyboard press to start count down
  const startCountDown = (): void => {
    console.log('Clicked Screen');
    setCountState(countDownStates.forSnapShot);
    resetCountDown();
  };

  // Count down reached zero figure out what to do next
  useEffect(() => {
    // Switch to show image instead of webcam
    if (countDown < 1 && countState === countDownStates.forSnapShot) {
      const imgSrc = webcamRef.current.getScreenshot();
      const newImageCount = imageCount + 1;

      dispatch(addPhoto(imgSrc, newImageCount));
      setImageCount(newImageCount);
      setCountState(countDownStates.forImage);
      setRandomSaying(Math.floor(Math.random() * feelGoods.length));
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
        return 'Touch Screen to Start';

      case countDownStates.forImage:
        if (imageCount < photoCount) {
          console.log(randomSaying);
          return feelGoods[randomSaying];
        }
        return 'Please hold while your strips are generated';

      default:
        if (countDown > cameraCount) {
          return 'Get Ready!';
        }
        return `${countDown}`;
    }
  };
  const generateSpinner = (): JSX.Element | null => {
    if (imageCount >= photoCount && countState === countDownStates.forImage) {
      return <Spinner />;
    }
    return null;
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
    <div
      className="flex-container"
      onClick={() =>
        countState === countDownStates.initial ? startCountDown() : ''
      }
    >
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
        <br />
        {generateSpinner()}
      </TextContainer>
    </div>
  );
};

export default WebcamPic;
