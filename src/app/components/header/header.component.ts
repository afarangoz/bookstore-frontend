import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;

  constructor(
    private cartService: CartService,
    private authService: AuthService, 
    private router: Router
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

  isAuthenticated():Boolean{
    return this.authService.isAuthenticated();
  }

  isAdmin():Boolean{
    return this.authService.isAdmin();
  }
}
