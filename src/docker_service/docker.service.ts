import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class DockerService {
  runDockerCompose(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Ejecutar el comando Docker Compose directamente en el host
      const command = 'docker compose -f /app/docker-compose-ciervo.yml up -d';

      console.log('Ejecutando comando:', command);  // Log para verificar el comando

      exec(command, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);  // Log de la salida estándar

        if (error) {
          console.error(`Error al ejecutar docker-compose en el host: ${error.message}`);
          reject(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.warn(`stderr: ${stderr}`);  // Log de la salida de errores
        }

        resolve(stdout);
      });
    });
  }

  stopDockerCompose(): Promise<string> {
    return new Promise((resolve, reject) => {
      const command = 'docker compose -f /app/docker-compose-ciervo.yml down';

      console.log('Ejecutando comando:', command);  // Log para verificar el comando

      exec(command, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);  // Log de la salida estándar

        if (error) {
          console.error(`Error al detener docker-compose en el host: ${error.message}`);
          reject(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.warn(`stderr: ${stderr}`);  // Log de la salida de errores
        }

        resolve(stdout);
      });
    });
  }
}
