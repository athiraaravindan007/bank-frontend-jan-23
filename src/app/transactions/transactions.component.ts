import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  // classrty for storing the res value for html
  transactions:any = []
  // for search bar 
  searchKey:string = ""

  constructor(private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    // make an api call
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.transactions = res
        
      },
      error:(err:any)=>{
        console.log(err);
        this.toaster.showError(err.error,"Fail")
      }
    })

  }

  // generate pdf
  generatePDF(){
    // 1. create object for jspdf
    let pdf = new jspdf()
    // 2. create title row
    let title_row = ['Type','Debit Account','Credit Account','Amount']
    // table body should array of array
    let table_body:any = []
    // styling for pdf 
    pdf.setFontSize(16)
    pdf.text("All Transactions",10,10)
    pdf.setFontSize(12)
    // convert transaction to array of array (mandatory)
    for(let element of this.transactions){
      var temp = [element.transaction_type,element.fromAcno,element.toAcno,element.amount]
      table_body.push(temp)
    }
    (pdf as any).autoTable(title_row,table_body)
    // view in new tab
    pdf.output('dataurlnewwindow')
    // download pdf
    pdf.save('transactions.pdf')
  }

}
