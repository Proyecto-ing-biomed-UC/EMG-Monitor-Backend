import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')  // Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
