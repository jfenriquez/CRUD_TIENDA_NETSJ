import { User } from './user.entity';
import { Producto } from '../../productos/entities/producto.entity';
export class Order {
  user: User;
  Producto: Producto[];
}
