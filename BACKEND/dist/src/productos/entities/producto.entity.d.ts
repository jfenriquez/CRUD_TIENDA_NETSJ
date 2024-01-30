import { Brand } from './brand.entity';
import { Categoria } from './categoria.entity';
export declare class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    fechaCreacion: Date;
    brand: Brand;
    categoria: Categoria;
}
