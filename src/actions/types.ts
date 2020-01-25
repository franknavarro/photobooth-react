import {
  GetInitial,
  AddPhotoAction,
  CreateStripsAction,
  UpdateStripsAction,
  ClearStripsAction,
  PrintAction,
  PrinterInCheckAction,
} from 'actions/photostrips';

export enum ActionTypes {
  getInitial,
  addPhoto,
  updateStrip,
  createStrips,
  clearStrips,
  printUpdate,
  printerInCheck,
}

export type Action =
  | GetInitial
  | AddPhotoAction
  | CreateStripsAction
  | UpdateStripsAction
  | ClearStripsAction
  | PrintAction
  | PrinterInCheckAction;
