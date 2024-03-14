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
}
