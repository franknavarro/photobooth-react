import { AddImageAction, ClearImagesAction } from 'actions/images';
import { CreateStripsAction } from 'actions/photostrips';

export enum ActionTypes {
  addImage,
  clearImages,
  createStrips,
}

export type Action = AddImageAction | ClearImagesAction | CreateStripsAction;
