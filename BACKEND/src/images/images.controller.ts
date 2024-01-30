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
import * as fs from 'fs';
import * as path2 from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

import { cloudinaryConfig } from '../../cloudinary.config';
cloudinary.config({
  cloud_name: 'ds1n3ewwk',
  api_key: '196797927392886',
  api_secret: 'fXIydF0DF7Ae9akTDcww8itIlh0',
});

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@UploadedFile() file, @Body() createImageDto: CreateImageDto) {
    try {
      const { originalname, filename, path } = file;
      const response = await cloudinary.uploader.upload(path, {
        public_id: filename,
      });
      const filePath = await path2.join('uploads', filename);
      console.log('filePath', filePath);

      // Verifica si la propiedad 'secure_url' existe en la respuesta de Cloudinary
      if (response && response.secure_url) {
        fs.unlinkSync(filePath);
        console.log(`File ${filename} deleted successfully.`);
        return response;
      } else {
        console.log(`File ${filename} not found on Cloudinary.`);
        return { message: 'File not found on Cloudinary' };
      }
    } catch (error) {
      console.error('Error processing file:', error);
      return { message: 'File error' };
    }
  }
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

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
