import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DockerService } from './docker.service';

@Processor('docker')
export class DockerProcessor {
  constructor(private readonly dockerService: DockerService) {}

  @Process('activar-contenedores')
  async handleActivarContenedores(job: Job) {
    console.log('Procesando tarea para activar contenedores...');
    return this.dockerService.runDockerCompose();  // Llama al servicio para ejecutar Docker Compose
  }

  @Process('detener-contenedores')
  async handleDetenerContenedores(job: Job) {
    console.log('Procesando tarea para detener contenedores...');
    return this.dockerService.stopDockerCompose();
  }
}
