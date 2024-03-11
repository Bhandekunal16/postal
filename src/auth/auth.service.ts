import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly common: CommonService,
    readonly neo: Neo4jService,
  ) {}

  async create() {
    try {
      const path =
        'https://drive.google.com/file/d/1orjtZku4cJVuwfAjKgb6-f2jmJB0oWB6/view?usp=drivesdk';
      const query = await this.neo
        .write(`load csv with headers from  '${path}' AS customer
      MERGE (u:postal{id:apoc.create.uuid()})
      ON CREATE SET u += {
          CircleName: customer.CircleName,
          RegionName: customer.RegionName,
          DivisionName: customer.DivisionName,
          OfficeName: customer.OfficeName,
          Pincode: customer.Pincode,
          OfficeType: customer.OfficeType,
          Delivery: customer.Delivery,
          District: customer.District,
          StateName: customer.StateName,
          Latitude: customer.Latitude,
          Longitude: customer.Longitude
        }`);
      return query;
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'error' };
    }
  }
}
