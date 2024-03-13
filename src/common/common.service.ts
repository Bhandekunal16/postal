/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Neo4jService } from 'nest-neo4j/dist';
const csv = require('fast-csv');

@Injectable()
export class CommonService {
  constructor(readonly neo: Neo4jService) {}

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
        console.log(`Parsed ${rowCount} rows`);

        const batchSize = 850;
        const batches = [];
        const startIndex = 141901;

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
  }

  async count() {
    try {
      console.log('i am start counting.');
      const ans = await this.findDuplicateObjects();
      console.log('i am trying...', ans.length);
      return ans;
    } catch (error) {
      return error;
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

    console.log(arr.length);

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
        console.log(duplicates.length);
      }
    });

    return duplicates;
  }

  isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
