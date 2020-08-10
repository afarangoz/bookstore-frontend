import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { UserModel } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _user: UserModel;
  private _token: string;

  public url = 'http://localhost:8090/api-auth';

  constructor(private http: HttpClient) { }

  public get user(): UserModel{
    if(this._user != null){
      return this._user;
    } else if(sessionStorage.getItem("user") != null){
      this._user = JSON.parse(sessionStorage.getItem("user")) as UserModel;
      return this._user;
    }
    return new UserModel();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(sessionStorage.getItem("token") != null){
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  getAuthorizationHeaderToken(): HttpHeaders{
    console.log(this.token);
    if(this.token != null){
      let httpHeaders  = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      });
      console.log(httpHeaders);
      return httpHeaders
    }
    
    return null;
  }

  getAuthorizationHeader(): HttpHeaders{
    let authorization = btoa('bookstore-frontend' + ':' + '*#06#');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authorization
    });
    
    return httpHeaders;
  }

  newUser(user: UserModel): Observable<any> {
    let authorization = btoa('bookstore-frontend' + ':' + '*#06#');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authorization
    });
    user.isEnable = true;
    user.roles = [
      'ROLE_USER'
   ];
    const body = {
      ...user
    };
    console.log(body);
    return this.http.post(this.url + '/user', body, { headers: httpHeaders });
  }

  login(user: UserModel): Observable<any> {
    let authorization = btoa('bookstore-frontend' + ':' + '*#06#');
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + authorization
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log('Body');
    console.log(params.toString());
    return this.http.post(this.url + '/oauth/token', params.toString(), { headers: httpHeaders });
  }


  saveToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem("token", JSON.stringify(this._token));
  }

  saveUser(access_token: string): void {
    let payload = this.decodeToken(access_token);
    this._user = new UserModel();
    this._user.username = payload.user_name;
    this._user.email = payload.email;
    this._user.fullName = payload.name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem("user", JSON.stringify(this._user));

  }

  decodeToken(access_token: string): any {
    if(access_token != null){
      return JSON.parse(atob(access_token.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.decodeToken(this.token);
    if(payload != null  && payload.user_name != null && payload.user_name.length > 1){
      return true;
    }
    return false;
  }

  hasRole(roleStr: string): boolean {
    if (this.user.roles.includes(roleStr)) {
      return true;
    }
    return false;
  }

  public isAdmin():Boolean{
    return  this.hasRole('ROLE_ADMIN');
  }

 public logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this._token = null;
    this._user = null;
  }
}
