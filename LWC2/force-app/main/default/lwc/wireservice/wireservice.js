import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id'
import NAME_FIELD from '@salesforce/schema/User.Name'
import Email_FIELD from '@salesforce/schema/User.Email'
import{getRecord} from 'lightning/uiRecordApi'
const data_fields=[NAME_FIELD,Email_FIELD]
export default class Wireservice extends LightningElement {
    userId=Id
    userDetails

   
//  wire with function
    @wire(getRecord,{recordId:'$userId', fields:data_fields})
    userDetailsHandler({data,error}){
      if(data){
        this.userDetails=data.fields
       }
      if(error){
        console.error(error)
      }
    }
//  wire with property
@wire(getRecord,{recordId:'$userId', fields:data_fields})
userDetailsPropery


}

