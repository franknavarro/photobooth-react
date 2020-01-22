import { AddImageAction } from 'actions/images';
import { CreateStripsAction } from 'actions/photostrips';

export enum ActionTypes {
  addImage,
  createStrips,
}

export type Action = AddImageAction | CreateStripsAction;
