import Jimp from 'jimp';

import { ActionTypes, Action } from 'actions';
import { stripSizePixels } from 'resources/constants';

export interface StripProps {
  type: string;
  pic: string;
}

export type ImageList = string[];

export type PhotostripState = {
  inProgress: Jimp;
  all: StripProps[];
  images: ImageList;
  printStatus: number;
  printerInCheck: boolean;
};

const resetJimpImage = (): Jimp => {
  return new Jimp(...stripSizePixels, 'white');
};

const INITIAL_STRIP: StripProps = {
  type: 'Colored',
  pic: '',
};

const INITIAL_STATE: PhotostripState = {
  inProgress: resetJimpImage(),
  all: [{ ...INITIAL_STRIP }],
  images: [],
  printStatus: 0,
  printerInCheck: false,
};

export const photostripsReducer = (
  state: PhotostripState = INITIAL_STATE,
  action: Action,
): PhotostripState => {
  switch (action.type) {
    case ActionTypes.addPhoto:
      return { ...state, images: [...state.images, action.payload] };

    case ActionTypes.updateStrip:
      return { ...state, inProgress: action.payload };

    case ActionTypes.createStrips:
      return { ...state, all: [...action.payload] };

    case ActionTypes.printerInCheck:
      return { ...state, printerInCheck: true };

    case ActionTypes.printUpdate:
      return { ...state, printStatus: action.payload, printerInCheck: false };

    case ActionTypes.clearStrips:
      return {
        inProgress: resetJimpImage(),
        all: [{ ...INITIAL_STRIP }],
        images: [],
        printStatus: -1,
        printerInCheck: false,
      };

    default:
      return state;
  }
};
