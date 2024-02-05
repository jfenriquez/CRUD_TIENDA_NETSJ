import { UpdateImageDto } from './dto/update-image.dto';
import { ConfigService } from '@nestjs/config';
export declare class ImagesService {
    private readonly configService;
    constructor(configService: ConfigService);
    create(file: any): Promise<import("cloudinary").UploadApiResponse | {
        message: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateImageDto: UpdateImageDto): string;
    remove(id: number): string;
}
