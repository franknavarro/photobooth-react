import {
  AddPhotoAction,
  CreateStripsAction,
  UpdateStripsAction,
  ClearStripsAction,
} from 'actions/photostrips';

export enum ActionTypes {
  addPhoto,
  updateStrip,
  createStrips,
  clearStrips,
}

export type Action =
  | AddPhotoAction
  | CreateStripsAction
  | UpdateStripsAction
  | ClearStripsAction;
