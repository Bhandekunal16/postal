import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(private readonly common: CommonService) {}

  async create() {
    try {
      const read = await this.common
        .readCsv()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error reading CSV:', error);
        });

      return read;
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'error' };
    }
  }
}
