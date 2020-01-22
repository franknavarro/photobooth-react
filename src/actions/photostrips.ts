import { ActionTypes } from './types';
import { Dispatch } from 'redux';

import Jimp from 'jimp';

export interface CreateStripsAction {
  type: ActionTypes.createStrips;
  payload: string;
}

export const createStrips = () => {
  return async (dispatch: Dispatch) => {
    const dpi = 300;
    const stripInches = [2, 6];
    const stripPixels = stripInches.map(inches => inches * dpi);

    const stripMain = new Jimp(...stripPixels, 'white', () => {});

    const base64 = await stripMain.getBase64Async(Jimp.MIME_JPEG);
    console.log('Finished generating base64');

    dispatch<CreateStripsAction>({
      type: ActionTypes.createStrips,
      payload: base64,
    });
  };
};
