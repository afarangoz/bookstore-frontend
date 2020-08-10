import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  public url = 'http://localhost:8090/api-book';

 
  constructor(private httpClient: HttpClient, private authService:AuthService) { }



  getBookById(id: string) {
    return this.httpClient.get<Book>(`${environment.url_api}book_apis${id}`);
  }



  new(book:Book): Observable<any> {
    const body = {
      ...book
    };
    console.log(body);
    return this.httpClient.post(this.url + '/books', body, { headers: this.authService.getAuthorizationHeaderToken() });
  }


  getAllBooks(){
    var pageNumber = 0;
    return this.httpClient.get(this.url + '/books?number='+pageNumber, { headers: this.getAuthorizationHeader() })
    .pipe(
      map((response: any ) => this.mapBooks(response.content))
    );
  }

  mapBooks(object: Object){
    console.log(object);
    if(object == null){
      return [];
    }
    const books : Book[] = [];
    Object.keys(object).forEach(key =>{
      const book: Book = object[key];
      books.push(book);
    });
    return books;
  }

  getAuthorizationHeader(): HttpHeaders{
    let authorization = btoa('bookstore-frontend' + ':' + '*#06#');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authorization
    });
    
    return httpHeaders;
  }

}
