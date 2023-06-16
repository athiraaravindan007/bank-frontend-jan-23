import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // form group/model for reactive forms
  registerForm = this.fb.group({
    // form array ( details coresponds to html input tags)
    // validations
    username : ['',[Validators.required,Validators.minLength(2),Validators.pattern('[A-Za-z ]*')]],
    acno : ['',[Validators.required,Validators.pattern('[0-9]*')]],
    password :['',[Validators.required,Validators.pattern('[A-Za-z0-9]*')]]
  })
// form group class is form builder
  constructor(private fb: FormBuilder, private api:ApiService, 
    private joinRouter:Router,private toaster:ToasterService ){}

register(){
  
  // alert msg for validation and button clicked

  if(  this.registerForm.valid){
    
    // get inputs
    let username = this.registerForm.value.username
    let acno = this.registerForm.value.acno
    let pswd = this.registerForm.value.password

    // register api call in service (for backend)
    this.api.register(username,acno,pswd).subscribe({
      next:(response:any)=>{
        console.log(response);
        // alert--> ngx-toastr
        this.toaster.showSuccess(`${response.username} Registered Successfully...`,'Success')
        setTimeout(() => {
           // navigate to login page 
        this.joinRouter.navigateByUrl('union-bank/login')
        }, 2000);
       
      },
      error:(err:any)=>{
        console.log(err);
        // alert--> ngx-toastr
        this.toaster.showError(`${err.error}`, 'Fail')

      }
    })
  }
  
  else{
    // form invalid
    // alert-->ngx-toastr
    this.toaster.showWarning("Invalid Form", 'warning')
  }
 
}


}
