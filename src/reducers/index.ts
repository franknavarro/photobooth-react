import { combineReducers } from 'redux';

import { imagesReducer, ImageState } from 'reducers/images';
import { photostripsReducer, PhotostripState } from 'reducers/photostrips';

export interface StoreState {
  images: ImageState;
  photostrips: PhotostripState;
}

export const reducers = combineReducers<StoreState>({
  images: imagesReducer,
  photostrips: photostripsReducer,
});
