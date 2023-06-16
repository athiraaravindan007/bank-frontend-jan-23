import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse:boolean = true
  
  // class property for string interpolation
  user:string = ""
// for balance enquiry
  balance:number = 0
  // for showing offcanvas
  showOffcanvas:boolean = true
// transferSuccessMsg and transferFailMsg for holding transaction success and failure message
transferSuccessMsg:string = ""
transferFailMsg:string = ""
// disabling transfer button after clicking
handleTransfer:boolean = true

  // transfer form
  transferForm = this.fb.group({
    creditAcno:["",[Validators.required,Validators.pattern("[0-9]*")]],
    creditAmount:["",[Validators.required,Validators.pattern("[0-9]*")]],
    profilePswd:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })

  constructor(private api:ApiService, private toaster:ToasterService, private fb:FormBuilder,
    private dashboardRouter:Router){}


  ngOnInit(): void {
    // get loginUsername from local storage and assign it to class property 
    // (|| "" this is for removing null error)
   this.user = localStorage.getItem("loginUsername") || ""
  }

  collapse(){
    this.isCollapse = !this.isCollapse
  }

  // get balance
  getBalance(){
    // get loginUserAcno from local storage
    let acno = localStorage.getItem("loginUserAcno")
    //  call balancr function of service
    this.api.balanceEnquiry(acno).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.balance = res
      },
      error:(err:any)=>{
        this.showOffcanvas = false
        console.log(err.error);
        this.toaster.showError(err.error,"Fail")
      }

    })
    
  }

  // fund transfer
  transfer(){
    // validate form
    if(this.transferForm.valid){
      // get input values from form
      let creditAcno = this.transferForm.value.creditAcno
      let creditAmount = this.transferForm.value.creditAmount
      let profilePswd = this.transferForm.value.profilePswd
      // make call to service
      this.api.fundTransfer(creditAcno,creditAmount,profilePswd).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.transferSuccessMsg = res
          this.handleTransfer = false
          setTimeout(() => {
            this.transferSuccessMsg=""
            this.handleTransfer = true
            this.transferForm.reset()
          }, 5000);
        },
        error:(err:any)=>{
          console.log(err.error);
          this.transferFailMsg = err.error
          this.handleTransfer = false
          setTimeout(() => {
            this.transferFailMsg=""
            this.handleTransfer = true
            this.transferForm.reset()
          }, 3000);
          
        }
      })
    





    }
    else{
      this.toaster.showWarning("Invalid Form","Warning")
      
    }
  }

  // cancel Transfer
  cancelTransfer(){
    this.transferForm.reset()
    this.transferFailMsg = ""
    this.transferSuccessMsg = ""
  }

  // delete account
  deleteMyAcno(){
    // make call to api service
    this.api.deleteAcno().subscribe({
      next:(res:any)=>{
        console.log(res);
         // alert res
         this.toaster.showWarning(res,"Warning")
         this.logout();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // logout
  logout(){
     // remove login data from local storage
     localStorage.removeItem("loginUserAcno")
     localStorage.removeItem("loginUsername")
     localStorage.removeItem("token")
   // rediret to landing page
   setTimeout(() => {
    this.dashboardRouter.navigateByUrl('')
  }, 2000);
}


}
