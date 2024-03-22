/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonService } from 'src/common/common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { POSTALSchema } from 'src/mongo/mongo.service';
require('dotenv').config();

@Module({
  controllers: [AuthController],
  providers: [AuthService, CommonService],
  imports: [
    MongooseModule.forFeature([{ name: 'POST', schema: POSTALSchema }]),
  ],
})
export class AuthModule {}
