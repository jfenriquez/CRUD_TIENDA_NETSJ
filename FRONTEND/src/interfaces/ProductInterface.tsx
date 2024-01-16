import { Category } from "./CategoryInterface";
export interface ProductInterface {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  stock: number;
  categoriaId: number;
  brandId: number;
}
