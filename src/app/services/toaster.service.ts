import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster:ToastrService) { }
//  success case
  showSuccess(msg:any,title:any){
    this.toaster.success(msg,title)
  }
  // error case
  showError(msg:any,title:any){
    this.toaster.error(msg,title)
  }
  // warning case
  showWarning(msg:any,title:any){
    this.toaster.warning(msg,title)
  }

}
