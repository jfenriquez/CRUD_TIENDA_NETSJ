import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ConfigService } from '@nestjs/config';

import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path2 from 'path';
@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  async create(file: any) {
    cloudinary.config({
      cloud_name: this.configService.get<string>(
        'config.cloudinaryConfig.cloudName',
      ),
      api_key: this.configService.get<string>(
        'config.cloudinaryConfig.apiKey_cloudinary',
      ),
      api_secret: this.configService.get<string>(
        'config.cloudinaryConfig.apiSecret',
      ),
    });
    this.configService.get<string>('config.cloudinaryConfig.apiKey_cloudinary');
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

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
