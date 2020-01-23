import { ActionTypes, Action } from 'actions';

export type PhotostripState = {
  color: string;
  bw: string;
};

const INITIAL_STATE: PhotostripState = {
  color: '',
  bw: '',
};

export const photostripsReducer = (
  state: PhotostripState = INITIAL_STATE,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.createStrips:
      return { ...state, color: action.payload };

    default:
      return state;
  }
};
