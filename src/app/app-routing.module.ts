import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BooksComponent } from './components/books/books.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import {  AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', component: LayoutComponent, 
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full'},
      { path: 'books', component: BooksComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'order', component: OrderComponent }
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
