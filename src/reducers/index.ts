import { combineReducers } from 'redux';

import { imagesReducer, ImageState } from './images';

export interface StoreState {
  images: ImageState;
}

export const reducers = combineReducers<StoreState>({
  images: imagesReducer,
});
