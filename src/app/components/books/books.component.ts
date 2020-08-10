import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books:Book[]= [];

  quantity:number=1;

  defaultPicture = 'assets/pictures/banner/HarryPotter_1.png';

  constructor(bookService: BookService, private cartService: CartService) { 
    bookService.getAllBooks().subscribe(
      response => {
        this.books = response
       }
    );
  }

  addToCart(book:Book) {
    this.cartService.addCart(book);
  }

  ngOnInit(): void {
  }

}
