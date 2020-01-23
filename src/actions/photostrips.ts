import Jimp from 'jimp';

import { ActionTypes } from 'actions/types';
import { AppThunk } from 'reducers';
import { PhotostripState, StripProps } from 'reducers/photostrips';

import {
  photoPaperPixels,
  stripSizePixels,
  imageSizePixels,
  xPosition,
  yPositions,
} from 'resources/constants';

export interface CreateStripsAction {
  type: ActionTypes.createStrips;
  payload: PhotostripState;
}

interface StripData {
  type: string;
  images: Jimp[];
}

export const createStrips = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const imagesBase64 = getState().images;

    const stripColored: Jimp = new Jimp(...stripSizePixels, 'white', () => {});
    await Promise.all(
      imagesBase64.map(async (image: string, index: number) => {
        const jimpImg: Jimp = await Jimp.read(image);
        jimpImg.resize(imageSizePixels[0], imageSizePixels[1]);
        stripColored.composite(jimpImg, xPosition, yPositions[index]);
      }),
    );

    const stripBW = stripColored.clone().grayscale();

    const stripMapData: StripData[] = [
      { type: 'Colored', images: [stripColored, stripColored] },
      { type: 'Black & White', images: [stripBW, stripBW] },
      { type: 'Both', images: [stripColored, stripBW] },
    ];

    const allStrips = await Promise.all<StripProps>(
      stripMapData.map(async ({ type, images }) => {
        const newStrip = await new Jimp(...photoPaperPixels, 'white')
          .composite(images[0], 0, 0)
          .composite(images[1], stripSizePixels[0], 0)
          .getBase64Async(Jimp.MIME_JPEG);
        return { type, pic: newStrip };
      }),
    );

    dispatch<CreateStripsAction>({
      type: ActionTypes.createStrips,
      payload: allStrips,
    });
  };
};
