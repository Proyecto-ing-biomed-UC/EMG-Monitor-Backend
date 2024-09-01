import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// Importa otros módulos necesarios aquí (como AuthModule cuando lo agregues)

@Module({
  imports: [
    // Configura el módulo de configuración para cargar las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    
    // Configura TypeORM para conectarse a la base de datos PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'postgres',  // Nombre del servicio del contenedor de Docker
        port: 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,  // Carga automáticamente las entidades registradas
        synchronize: true, // Solo para desarrollo, en producción deberías usar migraciones
      }),
    }),
    
    AuthModule,
    // Otros módulos que necesites (como AuthModule más adelante)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

