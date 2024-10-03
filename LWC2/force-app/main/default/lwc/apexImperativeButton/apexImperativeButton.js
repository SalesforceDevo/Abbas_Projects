import { LightningElement } from 'lwc';
import getAccountList  from '@salesforce/apex/AccountController.getAccountList'
export default class ApexImperativeButton extends LightningElement {
    accounts

    handleClick(){
        getAccountList()
        .then((result)=>{
            this.accounts=result
            console.log('ImperativeAccounts',this.accounts)
           
        })
        .catch((error)=>{
            console.error(error)
        })
    }
}