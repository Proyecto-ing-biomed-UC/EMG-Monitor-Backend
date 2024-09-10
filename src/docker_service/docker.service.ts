// src/docker/docker.service.ts

import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class DockerService {
  runDockerCompose(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('docker compose -f docker-compose-ciervo.yml up -d', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar docker-compose: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }

        console.log(`stdout: ${stdout}`);
        resolve(stdout);
      });
    });
  }

  stopDockerCompose(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('docker compose -f docker-compose-ciervo.yml down', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al detener docker-compose: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve(stdout);

    })
})
}
}
