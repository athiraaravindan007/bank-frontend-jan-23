import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // loading spinner
  isLoading:boolean = false
  
  // form group/model for reactive forms
  loginForm = this.fb.group({
    // form array ( details coresponds to html input tags)
    // validations
    acno : ['',[Validators.required,Validators.pattern('[0-9]*')]],
    password :['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  })
// form group class is form builder
  constructor(private fb: FormBuilder,private api:ApiService,
    private toaster:ToasterService,private loginRouter:Router){}

  login(){
  
    // alert msg for validation and button clicked
  
    if(  this.loginForm.valid){
      // get inputs
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.password
      // set isLoading to true
      this.isLoading = true

  
      // login api call in service (for backend)
      this.api.login(acno,pswd).subscribe({
        next:(res:any)=>{
          // response destructure in local storage
          const {preuser,token} = res
          // store username in local storage (for dashboard welcome user...as welcome Akhil or any)
          localStorage.setItem("loginUsername",preuser.username)
           // store acno in local storage 
           localStorage.setItem("loginUserAcno",preuser.acno)
          //  store token in local storage
          localStorage.setItem("token",token)

          
          // redirect to dashboard after 2 sec- user/dashboard
          setTimeout(() => {
            // set isLoading to false
            this.isLoading = false
            this.toaster.showSuccess(`Welcome ${preuser.username}`,'Success')
            this.loginRouter.navigateByUrl('user/dashboard')
            
          }, 2000);

          
        },
        error:(err:any)=>{
          console.log(err.error);
          this.toaster.showError(`${err.error}`,'Fail')

        }

      })
    }
    
    else{
      // form invalid
    this.toaster.showWarning('Invalid Form','Warning')
    }
   
  }

}
