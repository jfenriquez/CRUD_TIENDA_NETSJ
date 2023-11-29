import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controller/productos.controller';
import { CategoriasController } from './controller/categorias.controller';
import { CategoriasService } from './services/categorias.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ProductosController, CategoriasController],
  providers: [ProductosService, CategoriasService],
  exports: [ProductosService, CategoriasService],
})
export class ProductosModule {}
