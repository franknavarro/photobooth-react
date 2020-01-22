import { ActionTypes } from 'actions/types';
import history from 'routerHistory';

export interface AddImageAction {
  type: ActionTypes.addImage;
  payload: string;
}

export interface ClearImagesAction {
  type: ActionTypes.clearImages;
}

export const addImage = (imgSrc: string): AddImageAction => {
  return {
    type: ActionTypes.addImage,
    payload: imgSrc,
  };
};

export const clearImages = (): ClearImagesAction => {
  history.push('/');
  return {
    type: ActionTypes.clearImages,
  };
};
