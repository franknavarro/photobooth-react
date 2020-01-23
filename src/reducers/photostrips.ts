import { ActionTypes, Action } from 'actions';

export interface StripProps {
  type: string;
  pic: string;
}

export type PhotostripState = StripProps[];

const INITIAL_STATE: PhotostripState = [];

export const photostripsReducer = (
  state: PhotostripState = INITIAL_STATE,
  action: Action,
): PhotostripState => {
  switch (action.type) {
    case ActionTypes.createStrips:
      return [...action.payload];

    default:
      return state;
  }
};
