// src/docker/docker.controller.ts

import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Post('activar-contenedores')  // Ruta para activar los contenedores Docker
  async activarContenedores() {
    try {
      const result = await this.dockerService.runDockerCompose();
      return { message: 'Contenedores iniciados correctamente', result };
    } catch (error) {
      throw new HttpException(
        'Error al iniciar los contenedores de Docker: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('detener-contenedores')// Ruta para detener los contenedores Docker
  async detenerContenedores() {
    try {
      const result = await this.dockerService.stopDockerCompose();
      return { message: 'Contenedores detenidos correctamente', result };
    } catch (error) {
      throw new HttpException(
        'Error al detener los contenedores de Docker: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
