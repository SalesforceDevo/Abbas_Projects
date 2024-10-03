import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class CreateRecordFunction extends LightningElement {
    formFields={}
    changeHandler(event){
        const name=event.target.name
        const value=event.target.value
        this.formFields[name]=value
}

createContact(){

    const recordInput={apiName:CONTACT_OBJECT.objectApiName,fields:this.formFields}
    createRecord(recordInput).then(result=>{
this.showToast('success',`contact created: ${result.id}`,'success')
this.template.querySelector('form').reset(); // Adjusted form reference
                this.formFields = {}; // Reset formFields
    }).this.showToast('error Occured',error.body.message,'error')
}

showToast(title,message,variant){
    this.dispatchEvent(new ShowToastEvent({
        title,
        message,
        variant
    }))
}
}