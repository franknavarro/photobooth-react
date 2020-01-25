import Jimp from 'jimp';

import { ActionTypes } from 'actions/types';
import { PromiseThunk, AppThunk } from 'reducers';
import { StripProps } from 'reducers/photostrips';

import history from 'routerHistory';

import {
  photoPaperPixels,
  stripSizePixels,
  xPosition,
  yPositions,
} from 'resources/constants';

const { ipcRenderer } = window.require('electron');

export interface AddPhotoAction {
  type: ActionTypes.addPhoto;
  payload: string;
}
export interface CreateStripsAction {
  type: ActionTypes.createStrips;
  payload: StripProps[];
}
export interface UpdateStripsAction {
  type: ActionTypes.updateStrip;
  payload: Jimp;
}
export interface ClearStripsAction {
  type: ActionTypes.clearStrips;
}
export interface PrintAction {
  type: ActionTypes.printUpdate;
  payload: number;
}
export interface PrinterInCheckAction {
  type: ActionTypes.printerInCheck;
}

interface StripData {
  type: string;
  images: Jimp[];
}

export const addPhoto = (recentImage: string, imageNum: number): AppThunk => {
  return dispatch => {
    dispatch<AddPhotoAction>({
      type: ActionTypes.addPhoto,
      payload: recentImage,
    });
    dispatch(updateStrip(recentImage, imageNum));
  };
};

export const updateStrip = (
  recentImage: string,
  imageNum: number,
): PromiseThunk => {
  return async (dispatch, getState) => {
    const updateThis = getState().photostrips.inProgress;

    const jimpImg: Jimp = await Jimp.read(recentImage);

    updateThis.composite(jimpImg, xPosition, yPositions[imageNum - 1]);

    dispatch<UpdateStripsAction>({
      type: ActionTypes.updateStrip,
      payload: updateThis,
    });
  };
};

export const createStrips = (): PromiseThunk => {
  return async (dispatch, getState) => {
    const stripColored = getState().photostrips.inProgress;
    const stripBW = stripColored.clone().grayscale();

    const stripMapData: StripData[] = [
      { type: 'Color', images: [stripColored, stripColored] },
      { type: 'Black & White', images: [stripBW, stripBW] },
      { type: 'Both', images: [stripColored, stripBW] },
    ];

    const allStrips = await Promise.all<StripProps>(
      stripMapData.map(async ({ type, images }) => {
        const newStrip = await new Jimp(...photoPaperPixels, 'white')
          .composite(images[0], 0, 0)
          .composite(images[1], stripSizePixels[0], 0)
          .getBase64Async(Jimp.MIME_JPEG);
        return { type, pic: newStrip };
      }),
    );

    dispatch<CreateStripsAction>({
      type: ActionTypes.createStrips,
      payload: allStrips,
    });
  };
};

export const resetAndPrint = (print: string): AppThunk => {
  return dispatch => {
    history.push('/print');
    dispatch<ClearStripsAction>({
      type: ActionTypes.clearStrips,
    });
    dispatch<void>(startPrint(print));
  };
};

export const startPrint = (print: string): AppThunk => {
  return dispatch => {
    ipcRenderer.send('start:print', print);
    ipcRenderer.once('started:print', () => {
      console.log('Started Print React');
      dispatch(updatePrint());
    });
  };
};

export const updatePrint = (): AppThunk => {
  return (dispatch, getState) => {
    const currPrintStatus = getState().photostrips.printStatus;
    console.log('curr in redux: ', currPrintStatus);

    dispatch<PrinterInCheckAction>({
      type: ActionTypes.printerInCheck,
    });
    ipcRenderer.send('update:print', currPrintStatus);
    ipcRenderer.once('updated:print', (_event: any, printStatus: number) => {
      dispatch<PrintAction>({
        type: ActionTypes.printUpdate,
        payload: printStatus,
      });
    });
  };
};

export const resetPrint = (): PrintAction => {
  return {
    type: ActionTypes.printUpdate,
    payload: -1,
  };
};
