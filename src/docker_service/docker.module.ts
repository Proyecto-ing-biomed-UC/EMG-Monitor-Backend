// src/docker/docker.module.ts

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';
import { DockerProcessor } from './docker.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379
      }
    }),
    BullModule.registerQueue({
      name: 'docker',  // Asegúrate de que el nombre de la cola es 'docker'
    }),
  ],
  controllers: [DockerController],
  providers: [DockerService, DockerProcessor],
})
export class DockerModule {}
