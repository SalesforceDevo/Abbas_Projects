import { LightningElement,wire } from 'lwc';
import filteredAccounts  from '@salesforce/apex/AccountController.filteredAccounts' 
export default class ApexWireWithParams extends LightningElement {
    selectedType=''
    @wire(filteredAccounts,{typeac:'$selectedType'})
    accountsfilter

   get getOptionsType(){
        return[
            {label:"Customer - Channel",value:"Customer - Channel"},
            {label:"Prospect",value:"Prospect"}
        ]
    }
    typeHandler(event){
        this.selectedType=event.target.value
    }
}