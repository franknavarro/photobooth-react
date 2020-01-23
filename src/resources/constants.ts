type dimmensions = [number, number];

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
export const photoPaperPixels: dimmensions = [
  photoPaperInches[0] * dpi,
  photoPaperInches[1] * dpi,
];

export const stripSizePixels: dimmensions = [
  photoPaperPixels[0] / 2,
  photoPaperPixels[1],
];

export const imageSizePixels: dimmensions = [
  stripSizePixels[0] - fullBorders[0],
  (stripSizePixels[1] - fullBorders[1]) / imageports,
];

const yPos: number[] = [stripBorderPixels];
for (let i = 1; i < photoCount; i++) {
  const newX = stripBorderPixels * (i + 1) + imageSizePixels[1] * i;
  yPos.push(newX);
}
export const xPosition: number = stripBorderPixels;
export const yPositions = [...yPos];
