// src/data/data.controller.ts

import { Controller, Post, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DataService } from './data.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('guardar-datos')
  async guardarDatosEnCSV() {
    try {
      const message = await this.dataService.guardarDatosEnCSV();
      return { message };
    } catch (error) {
      throw new HttpException(
        'Error al guardar los datos en CSV',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('descargar-datos')
  descargarCSV(@Res() res: Response) {
    const filePath = path.join(__dirname, '../../../output.csv'); // Ajusta la ruta según sea necesario

    res.download(filePath, 'output.csv', (err) => {
      if (err) {
        console.error('Error al descargar el archivo CSV:', err);
        throw new HttpException(
          'Error al descargar el archivo CSV',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }
}
