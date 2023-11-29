"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductoDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateProductoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, imagen: { required: true, type: () => String }, precio: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, fechaCreacion: { required: true, type: () => Date }, usuarioCreacion: { required: true, type: () => String }, categoriaId: { required: true, type: () => Number } };
    }
}
exports.CreateProductoDto = CreateProductoDto;
//# sourceMappingURL=create-producto.dto.js.map