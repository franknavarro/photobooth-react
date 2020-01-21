import { ActionTypes, Action } from '../actions/types';

export type ImageState = string[];

export const imagesReducer = (state: ImageState = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.addImage:
      return [...state, action.payload];

    default:
      return state;
  }
};
