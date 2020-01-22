import { ActionTypes, Action } from 'actions';

export type ImageState = string[];

export const imagesReducer = (state: ImageState = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.addImage:
      return [...state, action.payload];

    case ActionTypes.clearImages:
      return [];

    default:
      return state;
  }
};
