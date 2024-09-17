// src/data/data.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';

@Injectable()
export class DataService {
  async guardarDatosEnCSV(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('python ciervo/save_data/saveDataInCSVFormat.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el script Python: ${error.message}`);
          reject(new HttpException('Error al guardar los datos en CSV', HttpStatus.INTERNAL_SERVER_ERROR));
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(new HttpException('Error al guardar los datos en CSV', HttpStatus.INTERNAL_SERVER_ERROR));
          return;
        }

        console.log(`stdout: ${stdout}`);
        resolve('Datos guardados correctamente en CSV');
      });
    });
  }
}
