import { LightningElement,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import TITLE_FIELD from '@salesforce/schema/Contact.Title'

export default class GetListUiAdapter extends LightningElement {
    contacts=[]
    pagetok=null
    nextPageTok=null
    previousPageTok=null
    @wire(getListUi,{objectApiName:CONTACT_OBJECT,listViewApiName:'All_Contacts',pageSize:3,sortBy:TITLE_FIELD,pageToken:'$pagetok'})
    getListofallContacts({data,error}){
        if (data) {
            console.log('List of All Contacts:', data);
            this.contacts=data.records.records
            this.nextPageTok=data.records.nextPageToken
            this.previousPageTok=data.records.previousPageToken
        }
        if (error) {
            console.error('Error fetching contacts:', error);
        }
       
    }
    handlePreviousPage(){
        this.pagetok=this.previousPageTok
    }
    handleNextPage(){
        this.pagetok=this.nextPageTok
    }
}