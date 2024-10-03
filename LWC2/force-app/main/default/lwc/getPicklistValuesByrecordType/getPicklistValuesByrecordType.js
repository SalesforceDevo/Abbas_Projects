import { LightningElement,wire } from 'lwc';
import { getPicklistValuesByRecordType,getObjectInfo} from 'lightning/uiObjectInfoApi';
import ACCOUNT from '@salesforce/schema/Account'

export default class GetPicklistValuesByrecordType extends LightningElement {
    ratingPicklist=[]
    IndustryPicklist=[]
    Rating_value=''
    Industry_value=''

    @wire(getObjectInfo,{objectApiName:ACCOUNT})
    objectinfo
    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT,recordTypeId:'$objectinfo.data.defaultRecordTypeId'})
    picklisthandler({data,error}){
if (data){
    console.log(data)
    this.ratingPicklist=this.options(data.picklistFieldValues.Rating)
    this.IndustryPicklist=this.options(data.picklistFieldValues.Industry)
}
if(error){
    console.error(error)
}

    }

    options(data){
        return data.values.map(item=>({"label":item.label,"value":item.value}))
    }

    
    handleChange_Rating(event) {
        this.Rating_value = event.detail.value; // Updates the value for Industry picklist
    }

    
    handleChange_Industry(event) {
        this.Industry_value = event.detail.value; // Updates the value for Industry picklist
    }


}