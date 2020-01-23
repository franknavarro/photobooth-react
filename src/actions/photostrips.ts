import Jimp from 'jimp';

import { ActionTypes } from 'actions/types';
import { AppThunk } from 'reducers';
import { PhotostripState, StripProps } from 'reducers/photostrips';

export interface CreateStripsAction {
  type: ActionTypes.createStrips;
  payload: PhotostripState;
}

interface StripData {
  type: string;
  images: Jimp[];
}

type dimmensions = [number, number];

export const createStrips = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const imagesBase64 = getState().images;

    const hasLogo: boolean = true;
    const photoCount: number = 3;
    const dpi: number = 300;

    const imageports: number = hasLogo ? photoCount + 1 : photoCount;

    const stripBorderInches: number = 0.125;
    const stripBorderPixels: number = stripBorderInches * dpi;
    const fullBorders: dimmensions = [
      stripBorderPixels * 2,
      (imageports + 1) * stripBorderPixels,
    ];

    const photoPaperInches: dimmensions = [4, 6];
    const photoPaperPixels: dimmensions = [
      photoPaperInches[0] * dpi,
      photoPaperInches[1] * dpi,
    ];

    const stripSizePixels: dimmensions = [
      photoPaperPixels[0] / 2,
      photoPaperPixels[1],
    ];

    const imageSizePixels: dimmensions = [
      stripSizePixels[0] - fullBorders[0],
      (stripSizePixels[1] - fullBorders[1]) / imageports,
    ];

    const xPosition: number = stripBorderPixels;
    const yPositions: number[] = [stripBorderPixels];
    for (let i = 1; i < imagesBase64.length; i++) {
      const newX = stripBorderPixels * (i + 1) + imageSizePixels[1] * i;
      yPositions.push(newX);
    }

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
