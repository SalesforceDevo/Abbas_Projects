import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
export default class Navigation extends NavigationMixin(LightningElement) {
@api recordId

    NavtoHomeHandler(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'home'
            }
        })
    }

    NavtoChatterHandler(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'chatter'
            }
        })
    }
 
    NavtoNewRecordHandler(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            }
        }) 
    }

// Navigation to new contact record with default values



    NavtoNewRecorddefaultHandler(){
       const defaultvalues= encodeDefaultFieldValues({
        FirstName:'Hero',
        LastName:'Zero',
        LeadSource:'Other'
        })

        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            },
            state:{
                defaultFieldValues:defaultvalues
            }
        }) 
    }


// Navigation to list of all contact records
    NavtolistHandler(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'list'
            },
            state:{
                filterName:'Recent'
            }
        }) 
    }

// Navigation to files
NavtofilesHandler(){
    this[NavigationMixin.Navigate]({
        type:'standard__objectPage',
        attributes:{
            objectApiName:'ContentDocument',
            actionName:'home'
        }
    }) 
}


}


