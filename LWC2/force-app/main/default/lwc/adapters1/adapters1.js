import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import { getObjectInfo, getObjectInfos } from 'lightning/uiObjectInfoApi';

const array_of_objects = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT];

export default class Adapters1 extends LightningElement {
    recordtypeId;
    accountApiName;
// getObjectInfo adapter
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    getObjectDetails({ data, error }) {
        if (data) {
            this.recordtypeId = data.defaultRecordTypeId;
            this.accountApiName = data.apiName;
            console.log('Account Metadata:', data);
        } else if (error) {
            console.error('Error fetching Account metadata:', error);
        }
    }
// getObjectInfos adapter
//     objectsInfo;
//     accountInfo;
//     opportunityInfo;

//     @wire(getObjectInfos, { objectApiNames: array_of_objects })
//     getObjectsDetails({ data, error }) {
//         if (data) {
//             this.objectsInfo = data;
//             this.accountInfo = data[ACCOUNT_OBJECT.objectApiName];
//             this.opportunityInfo = data[OPPORTUNITY_OBJECT.objectApiName];
//             console.log('Objects Info:', data);
//             console.log('Account Info:', this.accountInfo);
//             console.log('Opportunity Info:', this.opportunityInfo);
//         } else if (error) {
//             console.error('Error fetching objects info:', error);
//         }
//     }
// }
  }