/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Neo4jService } from 'nest-neo4j/dist';
const csv = require('fast-csv');

@Injectable()
export class CommonService {
  constructor(private readonly neo: Neo4jService) {}

  async readCsv() {
    const path = 'src/pinCode.csv';
    const jsonData = [];
    const stream = fs.createReadStream(path);

    csv
      .parseStream(stream, { headers: true })
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        jsonData.push(row);
      })
      .on('end', async (rowCount) => {
        const batchSize = 850;
        const batches = [];
        const startIndex = 0;

        for (let i = startIndex; i < jsonData.length; i += batchSize) {
          batches.push(jsonData.slice(i, i + batchSize));
        }

        for (const batch of batches) {
          await this.neo.write(
            `UNWIND $data as row
            MERGE (u:postal{id:apoc.create.uuid()})
            ON CREATE SET u += {  CircleName: row.CircleName,
                                  RegionName: row.RegionName,
                                  DivisionName: row.DivisionName,
                                  OfficeName: row.OfficeName,
                                  Pincode: row.Pincode,
                                  OfficeType: row.OfficeType,
                                  Delivery: row.Delivery,
                                  District: row.District,
                                  StateName: row.StateName,
                                  Latitude: row.Latitude,
                                  Longitude: row.Longitude
                                }`,
            { data: batch },
          );
        }
      });

    return { msg: 'process has been started.' };
  }

  async count(): Promise<{
    data?: Array<object> | Array<undefined>;
    res?: string;
    status: boolean;
    statusCode: number;
    msg: string;
  }> {
    try {
      const ans = await this.findDuplicateObjects();
      return { data: ans, status: true, statusCode: 200, msg: 'Success' };
    } catch (error) {
      return { res: error, status: false, statusCode: 500, msg: 'Error' };
    }
  }

  async findDuplicateObjects() {
    const duplicates = [];

    const list = await this.neo.read(
      `MATCH (node:postal)
      RETURN node ORDER BY id(node) ASC`,
    );

    const arr = list.records.map((element) => {
      const { id, ...properties } = element.get('node').properties;
      return properties;
    });

    arr.forEach(async (obj, index) => {
      let isDuplicate = false;
      for (let i = index + 1; i < arr.length; i++) {
        if (await this.isEqual(obj, arr[i])) {
          isDuplicate = true;
          break;
        }
      }

      if (isDuplicate) {
        duplicates.push(obj);
      }
    });

    return duplicates;
  }

  async isEqual(obj1, obj2) {
    return (await JSON.stringify(obj1)) === JSON.stringify(obj2);
  }
}
