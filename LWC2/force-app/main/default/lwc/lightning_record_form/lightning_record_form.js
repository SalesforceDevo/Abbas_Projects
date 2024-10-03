import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
import NAME_TYPE from '@salesforce/schema/Account.Type'
import NAME_Industry from '@salesforce/schema/Account.Industry'
export default class Lightning_record_form extends LightningElement {

    objectname = ACCOUNT_OBJECT
    fieldslist = [NAME_FIELD,ANNUAL_REVENUE_FIELD,NAME_TYPE,NAME_Industry]

    onsuccesshandler(event){
     console.log(event.detail.id)
     const eventtoast= new ShowToastEvent({
        title:"Account Created",
        message:"Record id:"+event.detail.id,
        variant:"success"
     })
     this.dispatchEvent(eventtoast)
    }
}