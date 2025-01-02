import { ObjectId } from 'mongodb'

export interface Season {
  _id?: ObjectId;
  title: string;
  description: string;
}