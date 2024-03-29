import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { search } from '../dto/search';

@Injectable()
export class PostalNeo4jService {
  constructor(private readonly neo: Neo4jService) {}

  async matchNode(limit: number) {
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
        : new NotFoundException('not found');
    } catch (error) {
      return {
        res: error,
        status: false,
        msg: 'error',
        statusCode: 500,
      };
    }
  }

  async match(node: string, properties: string, value: any) {
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
        : new NotFoundException('not found');
    } catch (error) {
      return {
        res: error,
        status: false,
        msg: 'error',
        statusCode: 500,
      };
    }
  }

  async name(body: search) {
    try {
      const Query = await this.neo.read(`
      MATCH (u:postal)
      WHERE u.CircleName =~ '(?i).*${body.value}.*'
      OR u.District =~ '(?i).*${body.value}.*'
      OR u.OfficeName =~ '(?i).*${body.value}.*'
      OR u.RegionName =~ '(?i).*${body.value}.*'
      OR u.StateName =~ '(?i).*${body.value}.*'
      OR u.DivisionName=~ '(?i).*${body.value}.*'
      RETURN collect(properties(u)) as response`);
      return Query.records.length > 0
        ? {
            status: true,
            count: Query.records[0].get('response').length,
            data: Query.records[0].get('response'),
            statusCode: 200,
            msg: 'success',
          }
        : new NotFoundException('not found');
    } catch (error) {
      return {
        res: error,
        status: false,
        msg: 'error',
        statusCode: 500,
      };
    }
  }

  async stateWiseCount(): Promise<{
    length?: number;
    data?: Array<object> | null;
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:postal)
        WITH n.StateName AS StateName, COUNT(n) AS Count
        RETURN StateName, Count`,
      );
      const data = Query.records.map((elem) => ({
        name: elem.get('StateName'),
        count: elem.get('Count').low,
      }));

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
