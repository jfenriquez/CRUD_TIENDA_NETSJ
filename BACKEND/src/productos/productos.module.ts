import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { CategoriasController } from './controller/categorias.controller';

import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Producto } from './entities/producto.entity';
import { Brand } from './entities/brand.entity';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Producto, Brand]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProductosController, CategoriasController],
  providers: [ProductosService, CategoriasService],
  exports: [ProductosService, CategoriasService],
})
export class ProductosModule {}
