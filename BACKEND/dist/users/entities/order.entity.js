"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
class Order {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("./user.entity").User }, Producto: { required: true, type: () => [require("../../productos/entities/producto.entity").Producto] } };
    }
}
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map