import { LightningElement,wire,api } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';

export default class GetRecordUiAdapter extends LightningElement {
    formFields=[
        {"fieldname":"AccountNumber", "label":"Account Number"},
        {"fieldname":"Phone", "label":"Phone Number"},
        {"fieldname":"AnnualRevenue", "label":"Annual Revenue"},
        {"fieldname":"Name", "label":"Name"},
    ]
    @api recordId
    @wire(getRecordUi,{recordIds:'$recordId',layoutTypes:'Full',modes:'Edit'})
    accountDataRecordHandler({data,error}){
        if(data){
         console.log('getrecodUiAdapter:', data)
         this.formFields=this.formFields.map(item=>{
            return{...item,"value":data.records[this.recordId].fields[item.fieldname].value}
         })
        
        }
        if(error){
console.error('getrecodUiAdapter error:', error)
        }
    }
}