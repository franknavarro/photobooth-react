import { combineReducers, Action } from 'redux';

import { photostripsReducer, PhotostripState } from 'reducers/photostrips';
import { ThunkAction } from 'redux-thunk';

export interface StoreState {
  photostrips: PhotostripState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  null,
  Action<number>
>;

export type PromiseThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  StoreState,
  null,
  Action<number>
>;

export const reducers = combineReducers<StoreState>({
  photostrips: photostripsReducer,
});
