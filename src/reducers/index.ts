import { combineReducers } from 'redux';

import { imagesReducer, ImageState } from './images';
import { photostripsReducer, PhotostripState } from './photostrips';

export interface StoreState {
  images: ImageState;
  photostrips: PhotostripState;
}

export const reducers = combineReducers<StoreState>({
  images: imagesReducer,
  photostrips: photostripsReducer,
});
