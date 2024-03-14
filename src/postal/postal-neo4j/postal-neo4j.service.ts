import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class PostalNeo4jService {
  constructor(private readonly neo: Neo4jService) {}

  async matchNode(limit: number): Promise<{
    length?: number;
    data?: Array<object> | null;
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:postal) return n limit ${limit}`,
      );
      const data = Query.records.map((elem) => elem.get('n').properties);

      return Query.records.length > 0
        ? {
            length: Query.records.length,
            data: data,
            status: true,
            statusCode: 200,
            msg: 'success',
          }
        : {
            data: null,
            status: false,
            statusCode: 404,
            msg: 'not found',
          };
    } catch (error) {
      return {
        res: error,
        status: false,
        msg: 'error',
        statusCode: 500,
      };
    }
  }

  async match(
    node: string,
    properties: string,
    value: any,
  ): Promise<{
    msg: string;
    data?: object | null;
    count?: number | undefined;
    res?: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node} {${properties}: $value}) RETURN collect(properties(n)) as response`,
        { value },
      );

      return Query.records.length > 0
        ? {
            status: true,
            count: Query.records[0].get('response').length,
            data: Query.records[0].get('response'),
            statusCode: 200,
            msg: 'success',
          }
        : {
            status: false,
            data: null,
            statusCode: 404,
            msg: 'not ',
          };
    } catch (error) {
      return {
        res: error,
        status: false,
        msg: 'error',
        statusCode: 500,
      };
    }
  }
}
