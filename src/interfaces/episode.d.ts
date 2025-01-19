import { ObjectId } from 'mongodb'

export interface Episode {
  _id?: ObjectId;
  orderNumber: number;
}