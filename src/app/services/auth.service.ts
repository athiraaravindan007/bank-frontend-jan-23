import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // isloggedIn
  isloggedIn(){
    // !! for boolean return like if and else ( present = true,  not present = false)
   return !!localStorage.getItem("token")
  }
}
