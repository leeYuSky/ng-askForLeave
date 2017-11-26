import { Injectable } from '@angular/core';

@Injectable()
export class CheckUserService {

  isLogin = false;
  current_user;

  constructor() { }

  login(username){
    this.current_user = username;
    this.isLogin = true;
  }

  logout(){
    this.current_user = null;
    this.isLogin = false;
  }

}
