import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookFormComponent } from './components/book-form/book-form.component';
import { MaterialModule } from '../modules/material/material.module';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';




@NgModule({
  declarations: [BookFormComponent, AdminNavComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
