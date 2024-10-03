import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
const cols = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable:true},
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue',editable:true}
];
export default class UpdateRecordFunction extends LightningElement {
    columns=cols
    Accountsdata=[]
    draftValues=[]
    @wire(getListUi,{objectApiName:ACCOUNT_OBJECT,listViewApiName:'All_Accounts'})
    getListofallContacts({data,error}){
if(data){
    console.log('All Accounts:',data)
    this.Accountsdata=data.records.records.map(item=>{
        return{
            "Id":item.fields['Id'].value,
            "Name":item.fields['Name'].value,
            "Phone":item.fields['Phone'].value,
            "Type":item.fields['Type'].value,
            "Industry":item.fields['Industry'].value,
            "AnnualRevenue": item.fields['AnnualRevenue'].displayValue ? item.fields['AnnualRevenue'].displayValue :item.fields['AnnualRevenue'].value
           
        }
    })
}
if(error){
    console.error('All Accounts error:',error)
}
}
handleSave(event)
{
    console.log('draftvalues',JSON.stringify(event.detail.draftValues))
    const recordInputs=event.detail.draftValues.map(draft=>{
        const fields={...draft}
        return {"fields":fields}
    })
  const promises =  recordInputs.map(recordInput=>updateRecord(recordInput))
  Promise.all(promises).then(()=>{
    this.showToast('success','Accounts have been updated','success')
    this.draftValues = [];  // Clear the draft values after save
  }).catch(error => {
    this.showToast('Error Occurred', error.body.message, 'error');
});
}
showToast(title,message,variant){
    this.dispatchEvent(new ShowToastEvent({
        title,
        message,
        variant
    }))
}
}