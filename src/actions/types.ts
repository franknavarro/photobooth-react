import {
  AddPhotoAction,
  CreateStripsAction,
  UpdateStripsAction,
  ClearStripsAction,
  PrintAction,
} from 'actions/photostrips';

export enum ActionTypes {
  addPhoto,
  updateStrip,
  createStrips,
  clearStrips,
  printUpdate,
}

export type Action =
  | AddPhotoAction
  | CreateStripsAction
  | UpdateStripsAction
  | ClearStripsAction
  | PrintAction;
