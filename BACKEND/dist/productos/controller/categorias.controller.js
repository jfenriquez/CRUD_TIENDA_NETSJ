"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const categorias_service_1 = require("../services/categorias.service");
const create_categoria_dto_1 = require("../dto/create-categoria.dto");
const update_categoria_dto_1 = require("../dto/update-categoria.dto");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_model_1 = require("../../auth/models/roles.model");
const platform_express_1 = require("@nestjs/platform-express");
let CategoriasController = class CategoriasController {
    constructor(categoriasService) {
        this.categoriasService = categoriasService;
    }
    newEndPoint() {
        return this.categoriasService.findAll();
    }
    create(createCategoriaDto) {
        return this.categoriasService.create(createCategoriaDto);
    }
    findAll() {
        return this.categoriasService.findAll();
    }
    async exportExcel(res) {
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
        const buffer = await this.categoriasService.exportToExcel(data, columns, sheetName);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
        res.end(buffer);
    }
    findOne(id) {
        return this.categoriasService.find(+id);
    }
    update(id, updateCategoriaDto) {
        return this.categoriasService.update(+id, updateCategoriaDto);
    }
    remove(id) {
        return this.categoriasService.remove(+id);
    }
    async uploadExcel(file) {
        if (!file) {
            throw new common_1.BadRequestException('No se ha cargado el archivo');
        }
        const filePath = file.path;
        const response = await this.categoriasService.loadFromExcel(filePath);
        return 'Datos cargados exitosament' + filePath;
    }
};
exports.CategoriasController = CategoriasController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('nuevo'),
    (0, roles_decorator_1.Roles)(roles_model_1.Role.CUSTOMER),
    openapi.ApiResponse({ status: 200, type: [require("../entities/categoria.entity").Categoria] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "newEndPoint", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/categoria.entity").Categoria }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categoria_dto_1.CreateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/categoria.entity").Categoria] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('export'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/categoria.entity").Categoria }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/categoria.entity").Categoria }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_categoria_dto_1.UpdateCategoriaDto]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriasController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "uploadExcel", null);
exports.CategoriasController = CategoriasController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('categorias'),
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [categorias_service_1.CategoriasService])
], CategoriasController);
//# sourceMappingURL=categorias.controller.js.map