import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CommonService {
  readCsv() {
    const path = 'src/pinCode.csv';

    console.log(path);

    return new Promise((resolve, reject) => {
      const data = [];

      fs.readFile(path, 'utf8', (err, content) => {
        if (err) {
          reject(err);
          return;
        }

        const rows = content.trim().split('\n');
        const headerRow = rows.shift();
        const header = headerRow.split(',').map((header) => header.trim());

        rows.forEach((row) => {
          const columns = row.split(',');
          const rowData = {};
          columns.forEach((column, index) => {
            const key = header[index];
            rowData[key] = column.trim();
          });
          data.push(rowData);
        });

        resolve(data);
      });
    });
  }
}
