import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/User';
import { NgForm } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  rememberMe = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    if(this.authService.isAuthenticated()){
      Swal.fire(this.authService.user.fullName + ' you are already authenticated!');
      this.router.navigate(['/books']);
    }
    if( localStorage.getItem('username') != null){
      this.user.username = localStorage.getItem('username');
    }
  }

  login(form: NgForm){
    if(form.invalid){
      return;
    }

    //Swal.showLoading();
    this.authService.login(this.user).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      if(this.rememberMe){
        localStorage.setItem('username', this.user.username);
      }
      Swal.fire('Welcome ' + this.authService.user.fullName);
      if(this.authService.isAdmin()){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/books']);
      }
    }, (error) => {
      
      if(error.status == 400 || error.status == 401){
        Swal.fire('Error', 'Bad credentials', 'error');
      }
    });
    


  }
}
