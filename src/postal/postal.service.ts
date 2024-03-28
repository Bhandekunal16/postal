import { Injectable } from '@nestjs/common';
import { PostalNeo4jService } from './postal-neo4j/postal-neo4j.service';
import { Neo4jQueryService } from 'src/neo4j-query/neo4j-query.service';
import { CommonService } from 'src/common/common.service';
import { search } from './dto/search';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { POSTAL } from 'src/mongo/mongo.service';

@Injectable()
export class PostalService {
  constructor(
    private readonly neo: PostalNeo4jService,
    private readonly db: Neo4jQueryService,
    private readonly common: CommonService,
    @InjectModel('POST') private readonly postModel: Model<POSTAL>,
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
      const query = await this.neo.matchNode(150000);
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async allPostalList2(): Promise<any> {
    try {
      const model: Model<POSTAL> = this.postModel as Model<POSTAL>;
      const result = await model.find();
      return result.length > 0
        ? { data: result, status: true, statusCode: 200, msg: 'success' }
        : { data: null, status: false, statusCode: 404, msg: 'failed' };
      return result;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
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
      const isValidKey = this.common.isValidKey(property);
      const isValidValue = this.common.isValidKey(value);
      const isHasSpace = this.common.hasSpaces(value);
      const checkedValue = !isValidValue ? !isHasSpace : !isValidValue;

      if (!isValidKey)
        return {
          res: 'please enter valid key',
          status: false,
          statusCode: 400,
          msg: 'Bad Request',
        };
      else if (checkedValue)
        return {
          res: 'please enter valid value',
          status: false,
          statusCode: 400,
          msg: 'Bad Request',
        };
      else {
        const query = await this.neo.match('postal', property, value);
        return query;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async matchWithName(body: search): Promise<{
    msg: string;
    data?: object | null;
    count?: number | undefined;
    res?: string;
    statusCode: number;
    status: boolean;
  }> {
    try {
      const query = this.neo.name(body);
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async stateWiseCount(): Promise<{
    length?: number | string | null;
    data?: Array<object> | null;
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const query = await this.neo.stateWiseCount();
      const query2 = await this.db.count('postal');
      return {
        length: query2.data,
        data: query.data,
        status: query.status,
        statusCode: query.statusCode,
        msg: query.msg,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
