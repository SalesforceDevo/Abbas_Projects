import { LightningElement, api } from 'lwc';

export default class LightningRecordFormLayout extends LightningElement {
    @api objectApiName;
    @api recordId;
}
