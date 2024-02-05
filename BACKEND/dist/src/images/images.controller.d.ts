import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    create(file: any): Promise<import("cloudinary").UploadApiResponse | {
        message: string;
    }>;
    findAll(): void;
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
