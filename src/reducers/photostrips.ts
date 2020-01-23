import Jimp from 'jimp';

import { ActionTypes, Action } from 'actions';
import { stripSizePixels } from 'resources/constants';

export interface StripProps {
  type: string;
  pic: string;
}

export type PhotostripState = {
  inProgress: Jimp;
  all: StripProps[];
};

const resetJimpImage = (): Jimp => {
  return new Jimp(...stripSizePixels, 'white');
};

const INITIAL_STATE: PhotostripState = {
  inProgress: resetJimpImage(),
  all: [],
};

export const photostripsReducer = (
  state: PhotostripState = INITIAL_STATE,
  action: Action,
): PhotostripState => {
  switch (action.type) {
    case ActionTypes.updateStrip:
      return { ...state, inProgress: action.payload };

    case ActionTypes.createStrips:
      return { ...state, all: action.payload };

    case ActionTypes.clearStrips:
      return { inProgress: resetJimpImage(), all: [] };

    default:
      return state;
  }
};
