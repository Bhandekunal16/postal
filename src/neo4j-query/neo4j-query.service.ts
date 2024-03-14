import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jQueryService {
  constructor(private readonly neo: Neo4jService) {}

  async match(
    node: string,
    properties: string,
    value: any,
  ): Promise<{
    msg: string;
    data?: object | null;
    res?: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node} {${properties}: $value}) RETURN n`,
        { value },
      );

      return Query.records.length > 0
        ? {
            status: true,
            data: Query.records[0].get('n').properties,
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

  async matchNode(node: string): Promise<{
    length?: number;
    data?: Array<object> | null;
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node}) RETURN COLLECT(properties(n)) AS node`,
      );

      return Query.records.length > 0
        ? {
            length: Query.records.length,
            data: Query.records[0].get('node'),
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

  async matchNodeRelation(
    node1: string,
    property: string,
    value: any,
    relation: string,
    node2: string,
  ): Promise<{
    data?: Array<object> | null;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node1} {${property}: $value})-[r:${relation}]->(d:${node2}) COLLECT(properties(d)) AS node`,
        { value },
      );

      return Query.records.length > 0
        ? {
            data: Query.records[0].get('node'),
            msg: 'SUCCESS',
            statusCode: 200,
            status: true,
          }
        : {
            data: null,
            msg: 'NOT FOUND',
            statusCode: 404,
            status: false,
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

  async matchNodeRelationOpp(
    node1: string,
    property: string,
    value: any,
    relation: string,
    node2: string,
  ): Promise<{
    data?: Array<object> | null;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node1} {${property}: $value})<-[r:${relation}]-(m:${node2}) COLLECT(properties(m)) AS node`,
        { value },
      );

      return Query.records.length > 0
        ? {
            data: Query.records[0].get('node'),
            msg: 'success',
            statusCode: 200,
            status: true,
          }
        : {
            data: null,
            msg: 'not found',
            statusCode: 404,
            status: false,
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

  async matchNodes(
    node1: string,
    property1: string,
    value1: any,
    relation: string,
    node2: string,
    property2: string,
    value2: any,
  ): Promise<{
    data?: Array<object> | null;
    data2?: Array<object> | null;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node1} {${property1}: $value1})-[r:${relation}]->(m:${node2} {${property2}: $value2}) COLLECT(properties(m)) AS node, COLLECT(properties(n)) AS node2`,
        { value1, value2 },
      );
      return Query.records.length > 0
        ? {
            data: Query.records[0].get('node'),
            data2: Query.records[0].get('node2'),
            msg: 'success',
            statusCode: 200,
            status: true,
          }
        : {
            data: null,
            msg: 'NOTFOUND',
            statusCode: 404,
            status: false,
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

  async matchNodesPagination(
    node1: string,
    property1: string,
    value1: any,
    relation: string,
    node2: string,
    property2: string,
    value2: any,
    skip: number,
    pageSize: number,
  ): Promise<{
    data?: Array<object> | null;
    data2?: Array<object> | null;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(
        `MATCH (n:${node1} {${property1}: $value1})-[r:${relation}]->(m:${node2} {${property2}: $value2}) RETURN m, n SKIP toInteger($skip) LIMIT toInteger($pageSize)`,
        { value1, value2, skip, pageSize },
      );

      const data = Query.records.map((record) => record.get('m').properties);
      const data2 = Query.records.map((record) => record.get('n').properties);

      return Query.records.length > 0
        ? { data, data2, msg: 'SUCCESS', statusCode: 200, status: true }
        : {
            data: null,
            msg: 'NOTFOUND',
            statusCode: 404,
            status: false,
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

  async count(node: string): Promise<{
    data?: number | string | null;
    res?: string;
    msg: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const Query = await this.neo.read(`MATCH (n:${node}) RETURN COUNT(n)`);

      return Query.records.length > 0
        ? {
            data: Query.records[0].get('COUNT(n)'),
            status: true,
            statusCode: 200,
            msg: 'SUCCESS',
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

  async edit(
    node: string,
    property: string,
    value: any,
    relation: string,
    node2: string,
    body: any,
  ): Promise<{
    data?: object | null;
    res?: string;
    msg: string;
    status: boolean;
    statusCode: number;
  }> {
    try {
      const Query = await this.neo.write(
        `MATCH (a:${node} {${property}: $value })<-[r:${relation}]-(m:${node2}) SET m += $props RETURN m `,
        { props: body, value: value },
      );

      return Query.records.length > 0
        ? {
            data: Query.records[0].get('m').properties,
            status: true,
            statusCode: 200,
            msg: 'SUCCESS',
          }
        : {
            data: null,
            statusCode: 404,
            status: false,
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
