import { ActionTypes } from 'actions/types';
import history from 'routerHistory';

import { createStrips } from 'actions/photostrips';
import { AppThunk } from 'reducers';

export interface AddImageAction {
  type: ActionTypes.addImage;
  payload: string;
}

export interface ClearImagesAction {
  type: ActionTypes.clearImages;
}

export const addImage = (imgSrc: string): AppThunk<void> => {
  return (dispatch, getState) => {
    dispatch<AddImageAction>({
      type: ActionTypes.addImage,
      payload: imgSrc,
    });

    if (getState().images.length >= 3) {
      dispatch<Promise<void>>(createStrips());
    }
  };
};

export const clearImages = (): ClearImagesAction => {
  history.push('/');
  return {
    type: ActionTypes.clearImages,
  };
};
