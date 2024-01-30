import { Producto } from './producto.entity';
export declare class Brand {
    id: number;
    nombre: string;
    imagen: string;
    fecha_creacion: Date;
    productos: Producto[];
}
