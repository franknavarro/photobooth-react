import {
  CreateStripsAction,
  UpdateStripsAction,
  ClearStripsAction,
} from 'actions/photostrips';

export enum ActionTypes {
  updateStrip,
  createStrips,
  clearStrips,
}

export type Action =
  | CreateStripsAction
  | UpdateStripsAction
  | ClearStripsAction;
