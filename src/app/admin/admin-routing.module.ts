import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';


const routes: Routes = [
  
  { path: '', component: AdminNavComponent, 
  children: [
    { path: 'create', component: BookFormComponent }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
