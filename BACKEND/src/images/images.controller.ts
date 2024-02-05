import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

import { v2 as cloudinary } from 'cloudinary';
import { multerConfig } from '../../multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@UploadedFile() file: any) {
    return this.imagesService.create(file);
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await cloudinary.api.delete_resources([id]);
      console.log(`Image with ID ${id} deleted successfully from Cloudinary.`);
      return {
        message: 'Image deleted successfully from Cloudinary',
        response,
      };
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return { message: 'Error deleting image from Cloudinary', error };
    }
  }
}
