import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const POSTALSchema = new mongoose.Schema({
  CircleName: String,
  Delivery: String,
  District: String,
  DivisionName: String,
  Latitude: String,
  Longitude: String,
  OfficeName: String,
  OfficeType: String,
  Pincode: String,
  RegionName: String,
  StateName: String,
});

export interface POSTAL extends mongoose.Document {
  CircleName: string;
  Delivery: string;
  District: string;
  DivisionName: string;
  Latitude: string;
  Longitude: string;
  OfficeName: string;
  OfficeType: string;
  Pincode: string;
  RegionName: string;
  StateName: string;
}

@Injectable()
export class MongoService {}
