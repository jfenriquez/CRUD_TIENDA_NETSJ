import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    create(file: any, createImageDto: CreateImageDto): Promise<import("cloudinary").UploadApiResponse | {
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImageDto: UpdateImageDto): string;
    remove(id: string): Promise<{
        message: string;
        response: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        response?: undefined;
    }>;
}
