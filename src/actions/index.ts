import { ActionTypes } from './types';

export interface AddImageAction {
  type: ActionTypes.addImage;
  payload: string;
}

export const addImage = (imgSrc: string): AddImageAction => {
  return {
    type: ActionTypes.addImage,
    payload: imgSrc,
  };
};
