import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @Column({ type: 'varchar', length: 250 })
  imagen: string;

  @Column({ type: 'varchar', length: 50 })
  precio: number;

  @Column({ type: 'varchar', length: 50 })
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;


  //UNA MARCA MUCHOS PRODUCTOS
  @ManyToOne(() => Brand, (brand) => brand.productos)
  brand: Brand;

  //UNA CATEGORIA PUEDE TENER MUCHOS PRODUCTOS
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  //@JoinTable({ name: 'id' })
  categoria: Categoria;
}
