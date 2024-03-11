/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonService } from 'src/common/common.service';
require('dotenv').config();

@Module({
  controllers: [AuthController],
  providers: [AuthService, CommonService],
})
export class AuthModule {}
