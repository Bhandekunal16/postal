/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { environment } from 'src/env/enviroment';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(private readonly common: CommonService) {}

  async create(key: string): Promise<any> {
    try {
      const access = environment.ACCESSKEY;
      return key == access
        ? await this.common.readCsv()
        : {
            res: 'accesskey mismatch',
            status: false,
            statusCode: 404,
            msg: 'error',
          };
    } catch (error) {
      throw new Error(error);
    }
  }

  async count(): Promise<any> {
    try {
      return await this.common.count();
    } catch (error) {
      throw new Error(error);
    }
  }
}
