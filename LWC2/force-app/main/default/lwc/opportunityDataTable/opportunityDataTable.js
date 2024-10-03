import { LightningElement, track, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import updateOpportunities from '@salesforce/apex/OpportunityController.updateOpportunities';
import { refreshApex } from '@salesforce/apex'; // Import refreshApex
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DatatableComponent extends LightningElement {
    @track data = [];
    @track columns = [
        { label: 'Opportunity Name', fieldName: 'Name', editable: true },
        { label: 'Amount', fieldName: 'Amount', editable: true },
        { label: 'Stage', fieldName: 'StageName', editable: true },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date', editable: true }
    ];
    @track searchTerm = '';
    @track draftValues = []; // Holds draft values for the datatable
    @track sortedBy;
    @track sortDirection;
    @track page = 1;
    wiredOpportunitiesResult;

    // Fetch opportunities data with wire
    @wire(getOpportunities, { searchTerm: '$searchTerm', page: '$page' })
    opportunitiesHandler(result) {
        this.wiredOpportunitiesResult = result; // Keep the result for refreshApex
        const { data, error } = result;
        if (data) {
            this.data = data;
        } else if (error) {
            this.showToast('Error', 'Error fetching opportunities', 'error');
            console.error('Error fetching opportunities', error);
        }
    }

    handleSearch(event) {
        this.searchTerm = event.target.value; // Updates the search term
    }

    handleSave(event) {
        const updatedFields = event.detail.draftValues;

        // Call Apex to update opportunities
        updateOpportunities({ data: updatedFields })
            .then(() => {
                this.showToast('Success', 'Opportunities updated successfully', 'success');

                // Clear draft values in the datatable
                this.draftValues = [];
                return refreshApex(this.wiredOpportunitiesResult); // Refresh data from wire after save
            })
            .catch(error => {
                this.showToast('Error', 'Error updating opportunities: ' + error.body.message, 'error');
            });
    }

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        // Add sorting logic here if needed
    }

    handleNextPage() {
        this.page += 1;
    }

    handlePreviousPage() {
        this.page -= 1;
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
