import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import Swal from 'sweetalert2';

import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  book:Book;

  bookForm = this.fb.group({
    name: [null, Validators.required],
    price: [null, Validators.required],
    available: [null, Validators.required],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private bookService: BookService) {

  }

  onSubmit() {
    let newBook: Book = {
      name: this.bookForm.controls.name.value,
      price: this.bookForm.controls.price.value,
      available : this.bookForm.controls.available.value,
    } as any;
    this.bookService.new(newBook).subscribe(response =>{
      Swal.fire('Libro creado!' );
      console.log(response)
    }
      , (error) => {
        console.log(error)
        if(error.status == 400 || error.status == 401){
          Swal.fire('Error', 'Bad credentials', 'error');
        }
    })

  }

}
