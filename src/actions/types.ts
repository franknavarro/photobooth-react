import {
  AddPhotoAction,
  CreateStripsAction,
  UpdateStripsAction,
  ClearStripsAction,
  PrintAction,
  PrinterInCheckAction,
} from 'actions/photostrips';

export enum ActionTypes {
  addPhoto,
  updateStrip,
  createStrips,
  clearStrips,
  printUpdate,
  printerInCheck,
}

export type Action =
  | AddPhotoAction
  | CreateStripsAction
  | UpdateStripsAction
  | ClearStripsAction
  | PrintAction
  | PrinterInCheckAction;
