import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/orderProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, OrderProduct]),
    ProductosModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
