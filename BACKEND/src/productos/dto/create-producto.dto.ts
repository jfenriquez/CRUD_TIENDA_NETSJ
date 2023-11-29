import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateProductoDto {
    
  readonly nombre: string;
  readonly descripcion: string;
  readonly imagen: string;
  readonly precio: number;
  readonly stock: number;
  readonly fechaCreacion: Date;
  readonly usuarioCreacion: string;
  readonly categoriaId: number;
}
