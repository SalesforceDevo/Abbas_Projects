import { LightningElement,wire } from 'lwc';
import {NavigationMixin,CurrentPageReference} from 'lightning/navigation'

export default class Navigation2 extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference)
    pageRef

// Navigation to contact record page in view mode
    NavtoRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            
            attributes:{
                recordId:'0038N00000LaOfUQAV',
                objectApiName:'Contact',
                actionName:'view'
            }
        }) 
    }

    // Navigation to contact record page in edit mode
    NavtoRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            
            attributes:{
                recordId:'0038N00000LaOfUQAV',
                objectApiName:'Contact',
                actionName:'edit'
            }
        }) 
    }

    // Navigation to Tab
    NavtoTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            
            attributes:{
                apiName:'lwc2'
                
            }
        }) 
    }
// Navigation to relationship object(contact) of an account
NavtoRelobj(){
    this[NavigationMixin.Navigate]({
        type:'standard__recordRelationshipPage',
        
        attributes:{
            recordId:'0018N00000Q5O8uQAF',
            objectApiName:'Account',
            relationshipApiName:'Contacts',
            actionName:'view'
        }
    }) 
}

// Navigation to external Website
NavtoexternalWebpage(){
    this[NavigationMixin.Navigate]({
        type:'standard__webPage',
        
        attributes:{
            url:'https://developer.salesforce.com/docs/component-library/bundle/lightning-card/example'
        }
    }) 
}
// Navigation to another Lwc
NavtoanotherLWC(){
   var defination={
    componentDef:'c:navigation',
    attributes:{
        recordId:'76373637637'
    }
   }

this[NavigationMixin.Navigate]({
    type:'standard__webPage',
    
    attributes:{
        url:'/one/one.app#'+btoa(JSON.stringify(defination))
    }
}) 
}

// To get current Pagereference

get pageReference(){
return this.pageRef ? JSON.stringify(this.pageRef,null,2):'';
}
}