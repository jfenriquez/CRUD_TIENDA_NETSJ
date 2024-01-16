import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return 'get orders';
  }

  @Get(':id')
  getOrder() {
    return 'get order id';
  }
}
