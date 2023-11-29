import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

//import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags } from '@nestjs/swagger';
//import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';

//import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
//@UseGuards(ApiKeyGuard)
@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Public()
  @Get('nuevo')
  @Roles(Role.CUSTOMER)
  newEndPoint() {
    return this.categoriasService.findAll();
  }

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get('export')
  async exportExcel(@Res() res: Response): Promise<void> {
    const data = await this.categoriasService.findAll();

    const columns = [
      {
        header: 'ID',
        key: 'id',
        width: 10,
      },
      {
        header: 'Nombre',
        key: 'nombre',
        width: 32,
      },
      {
        header: 'Descripción',
        key: 'descripcion',
        width: 32,
      },
      {
        header: 'Imagen',
        key: 'imagen',
        width: 32,
      },
      {
        header: 'Estado',
        key: 'estado',
        width: 32,
      },
      {
        header: 'Fecha Creación',
        key: 'fecha_creacion',
        width: 32,
      },
    ];

    const sheetName = 'Sheet1';

    const buffer = await this.categoriasService.exportToExcel(
      data,
      columns,
      sheetName,
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=exported_data.xlsx',
    );
    res.end(buffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.find(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('No se ha cargado el archivo');
    }
    const filePath = file.path;

    const response = await this.categoriasService.loadFromExcel(filePath);

    return 'Datos cargados exitosament' + filePath;
  }
}
