import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { Repository } from 'typeorm';
import * as Excel from 'exceljs';
export declare class CategoriasService {
    private categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    find(id: number): Promise<Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    remove(id: number): Promise<{
        message: string;
        categoria: Categoria;
    }>;
    loadFromExcel(filePath: string): Promise<void>;
    exportToExcel(data: any[], columns: {
        header: string;
        key: string;
    }[], sheetName: string): Promise<Excel.Buffer>;
}
