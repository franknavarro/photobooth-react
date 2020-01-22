import { AddImageAction } from './images';
import { CreateStripsAction } from './photostrips';

export enum ActionTypes {
  addImage,
  createStrips,
}

export type Action = AddImageAction | CreateStripsAction;
