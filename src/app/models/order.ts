import { UserModel } from './User';
import { OrderBook } from './OrderBook';

export class Order {
    id:number;
	date:Date;
    user:UserModel;
    orderBooks:OrderBook[];
}