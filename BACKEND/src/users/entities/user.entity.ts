import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  recovery_token: string;

  @Column({ type: 'varchar', length: 50 })
  rol: string;

  @Expose()
  get fullName(): string {
    return `${this.nombre} ${this.apellido}`;
  }
}
