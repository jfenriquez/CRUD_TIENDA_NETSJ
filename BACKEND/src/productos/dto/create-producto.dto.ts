import { IsString, IsNotEmpty, IsDate, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly descripcion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly imagen: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly precio: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly fechaCreacion: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriaId: number;
}
