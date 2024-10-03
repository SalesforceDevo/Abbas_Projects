import { LightningElement,wire } from 'lwc';
import getAccountList  from '@salesforce/apex/AccountController.getAccountList'

export default class ApexWire extends LightningElement {
    accountdada=[]
    @wire(getAccountList)
    accounts({data,error}){
        if(data){
            console.log('Wired Accounts data',data)
            this.accountdada=data
        }
    }
}