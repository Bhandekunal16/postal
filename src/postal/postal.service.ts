import { Injectable } from '@nestjs/common';
import { PostalNeo4jService } from './postal-neo4j/postal-neo4j.service';
import { Neo4jQueryService } from 'src/neo4j-query/neo4j-query.service';

@Injectable()
export class PostalService {
  constructor(
    private readonly neo: PostalNeo4jService,
    private readonly db: Neo4jQueryService,
  ) {}

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

  async count(): Promise<{
    data?: string | number;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const query = await this.db.count('postal');
      return query;
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'error' };
    }
  }

  async matchWithProperty(
    property: string,
    value: any,
  ): Promise<{
    msg: string;
    data?: object;
    res?: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const query = await this.neo.match('postal', property, value);
      return query;
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'error' };
    }
  }
}
