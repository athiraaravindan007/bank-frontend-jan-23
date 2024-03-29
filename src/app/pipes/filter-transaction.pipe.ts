import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  transform(transactionArray:any[],searchKey:string,property:string): any[] {
    const result:any = []
    if(!transactionArray || searchKey=="" || property==""){
      return transactionArray
    }
    transactionArray.forEach((item:any)=>{
     if( item[property].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
      result.push(item)
     }
    })
    return result;
  }

}
