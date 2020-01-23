import { combineReducers, Action } from 'redux';

import { imagesReducer, ImageState } from 'reducers/images';
import { photostripsReducer, PhotostripState } from 'reducers/photostrips';
import { ThunkAction } from 'redux-thunk';

export interface StoreState {
  images: ImageState;
  photostrips: PhotostripState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  null,
  Action<number>
>;

export const reducers = combineReducers<StoreState>({
  images: imagesReducer,
  photostrips: photostripsReducer,
});
