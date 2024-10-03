import { LightningElement,wire,api } from 'lwc';
import {getRecord,getFieldValue,getFieldDisplayValue} from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name'
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'

export default class GetRecordAdapter extends LightningElement {
    @api recordId
    name
    owner
    revenue


    // To get few fields of a record
    @wire(getRecord,{recordId:'$recordId',fields:[NAME_FIELD,OWNER_NAME_FIELD,ANNUALREVENUE_FIELD]})
        GetRecorddata({data,error}){
if(data){
    console.log(data)
    //getFieldValue and getFieldDisplayValues are used here
    this.revenue=getFieldDisplayValue(data,ANNUALREVENUE_FIELD)
    this.owner=data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
    this.name=getFieldValue(data,NAME_FIELD)
}
if(error){

}
        }

// To get all fields of a record
@wire(getRecord,{recordId:'$recordId',layoutTypes:['Full'],modes:['View']})
GetallfieldsofRecord({data,error}){
if(data){
    console.log(data)
}

}

}