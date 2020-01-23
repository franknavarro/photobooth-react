import Jimp from 'jimp';

import { ActionTypes } from 'actions/types';
import { AppThunk } from 'reducers';

export interface CreateStripsAction {
  type: ActionTypes.createStrips;
  payload: string;
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

    const imageSizePixels = [
      stripSizePixels[0] - fullBorders[0],
      (stripSizePixels[1] - fullBorders[1]) / imageports,
    ];

    const xPosition: number = stripBorderPixels;
    const yPositions: number[] = [stripBorderPixels];
    for (let i = 1; i < imagesBase64.length; i++) {
      const newX = stripBorderPixels * (i + 1) + imageSizePixels[1] * i;
      yPositions.push(newX);
    }

    const stripMain = new Jimp(...stripSizePixels, 'white', () => {});
    await Promise.all(
      imagesBase64.map(async (image: string, index: number) => {
        const jimpImg = await Jimp.read(image);
        jimpImg.resize(imageSizePixels[0], imageSizePixels[1]);
        stripMain.composite(jimpImg, xPosition, yPositions[index]);
      }),
    );

    const base64 = await stripMain.getBase64Async(Jimp.MIME_JPEG);
    // console.log('Finished generating base64');

    dispatch<CreateStripsAction>({
      type: ActionTypes.createStrips,
      payload: base64,
    });
  };
};
