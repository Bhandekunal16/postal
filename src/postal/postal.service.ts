import { Injectable } from '@nestjs/common';
import { PostalNeo4jService } from './postal-neo4j/postal-neo4j.service';

@Injectable()
export class PostalService {
  constructor(private readonly neo: PostalNeo4jService) {}

  async allPostalList(): Promise<{
    length?: number;
    data?: object[];
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const query = await this.neo.matchNode(300);
      return query;
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'error' };
    }
  }
}
