import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Order } from 'src/app/models/order';
import { OrderBook } from 'src/app/models/OrderBook';
import { OrderComponent } from 'src/app/components/order/order.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private books: Book[] = [];
  private cart = new BehaviorSubject<Book[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(book: Book) {
    this.books = [...this.books, book];
    this.cart.next(this.books);
  }

  public getOrderData():OrderBook[]{
    return [];
  }

  public getBooks():Book[]{
    return this.books;
  }
}
