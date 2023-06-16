import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options ={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // server url
  BASE_URL ='https://bank-jan-23-l1zs.onrender.com'

  constructor(private http:HttpClient) { }

  register(username:any,acno:any,password:any){
    // req body
    const body ={
      username,
      acno,
      password
    }
    // to call register api
   return  this.http.post(`${this.BASE_URL}/employee/register`,body)

  }

  // login api
  login(acno:any,password:any){
  const body = {
    acno,
    password
  }
   // login api call
   return  this.http.post(`${this.BASE_URL}/employee/login`,body)

  }

  // adding header to http request (for jwt token)
  appendToken(){
    // get token from local storage
    const token = localStorage.getItem("token")
    // create http header
    let headers = new HttpHeaders()
    if(token){
      // append token in headers
     headers=  headers.append("access-token",token)
     options.headers = headers
    }
    return options 
  }


  // balance enquiry
  balanceEnquiry(acno:any){
    // make server api call to get balance
    return this.http.get(`${this.BASE_URL}/user/balance/${acno}`,this.appendToken())


  }

  // fund transfer
  fundTransfer(creditAcno:any,creditAmount:any,pswd:any){
    // req body
    const body ={
      creditAcno,
      creditAmount,
      pswd
    }
    // make an api call
    return this.http.post(`${this.BASE_URL}/user/transfer`,body,this.appendToken())


  }

  // get transactions
  getTransactions(){
    return this.http.get(`${this.BASE_URL}/user/ministatment`,this.appendToken())
  }

  // delete acno
  deleteAcno(){
    // make an api call
   return this.http.delete(`${this.BASE_URL}/user/delete`,this.appendToken())
  }

}
