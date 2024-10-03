import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import createContact from '@salesforce/apex/ContactController.createContact';
import updateContact from '@salesforce/apex/ContactController.updateContact';
import deleteContact from '@salesforce/apex/ContactController.deleteContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class ContactManager extends LightningElement {
    @track contacts = [];
    @track newContact = {
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: ''
    };
    @track draftValues = [];
    wiredContactsResult;

    columns = [
        { label: 'First Name', fieldName: 'FirstName', editable: true },
        { label: 'Last Name', fieldName: 'LastName', editable: true },
        { label: 'Email', fieldName: 'Email', editable: true },
        { label: 'Phone', fieldName: 'Phone', editable: true },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'Delete', name: 'delete' }
                ]
            }
        }
    ];

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
        } else if (result.error) {
            console.error('Error fetching contacts', result.error);
        }
    }

    handleFieldChange(event) {
        const field = event.target.dataset.id;
        this.newContact[field] = event.target.value;
    }

    handleCreateContact() {
        createContact({ contact: this.newContact })
            .then(() => {
                this.showToast('Success', 'Contact created successfully', 'success');
                this.newContact = { FirstName: '', LastName: '', Email: '', Phone: '' };
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                this.showToast('Error', 'Error creating contact: ' + error.body.message, 'error');
            });
    }

    handleUpdateContact(event) {
        const updatedFields = event.detail.draftValues;
        updateContact({ contacts: updatedFields })
            .then(() => {
                this.showToast('Success', 'Contacts updated successfully', 'success');
                this.draftValues = [];
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                this.showToast('Error', 'Error updating contacts: ' + error.body.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            this.handleDeleteContact(row.Id);
        }
    }

    handleDeleteContact(contactId) {
        deleteContact({ contactId })
            .then(() => {
                this.showToast('Success', 'Contact deleted successfully', 'success');
                return refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                this.showToast('Error', 'Error deleting contact: ' + error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
