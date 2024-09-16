import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('docker')
export class DockerController {
  constructor(@InjectQueue('docker') private readonly dockerQueue: Queue) {}  // Inyecta la cola 'docker'

  @Post('activar-contenedores')  // Ruta para activar los contenedores Docker
  async activarContenedores() {
    try {
      await this.dockerQueue.add('activar-contenedores');  // Añadir tarea a la cola 'activar-contenedores'
      return { message: 'La activación de contenedores está en proceso.' };  // Responder inmediatamente
    } catch (error) {
      throw new HttpException(
        'Error al iniciar los contenedores de Docker: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('detener-contenedores')  // Ruta para detener los contenedores Docker
  async detenerContenedores() {
    try {
      await this.dockerQueue.add('detener-contenedores');  // Añadir tarea a la cola 'detener-contenedores'
      return { message: 'La detención de contenedores está en proceso.' };  // Responder inmediatamente
    } catch (error) {
      throw new HttpException(
        'Error al detener los contenedores de Docker: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
