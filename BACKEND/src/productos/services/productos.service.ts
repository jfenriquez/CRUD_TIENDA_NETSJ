import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
//import { CategoriasService} from '../../productos/services/categorias.service';
import { CategoriasService } from './categorias.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    private categoriasService: CategoriasService,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const newProducto =
        await this.productoRepository.create(createProductoDto);
      if (createProductoDto.categoriaId || createProductoDto.brandId) {
        ///categoria
        const categoria = await this.categoriasService.find(
          createProductoDto.categoriaId,
        );
        ///MARCA
        const marca = await this.categoriasService.find(
          createProductoDto.brandId,
        );
        newProducto.categoria = categoria;
      }
      return this.productoRepository.save(newProducto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.productoRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.productoRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!result) {
        throw new NotFoundException(`Error ,${id}`);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    try {
      const products = await this.productoRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!products) {
        throw new NotFoundException(`Error ,${id}`);
      }
      this.productoRepository.merge(products, updateProductoDto);
      return this.productoRepository.save(products);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const products = await this.productoRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!products) {
        throw new NotFoundException(`Error ,${id}`);
      }
      return await this.productoRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
