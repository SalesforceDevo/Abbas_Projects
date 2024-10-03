import { LightningElement, track } from 'lwc';
import fetchExternalData from '@salesforce/apex/ExternalApiController.fetchExternalData';

export default class ExternalApiData extends LightningElement {
    @track data;
    @track error;

    handleFetchData() {
        fetchExternalData()
            .then(result => {
                this.data = result;
                this.error = undefined;
            })
            .catch(error => {
                this.data = undefined;
                this.error = 'Error fetching data: ' + error.body.message;
            });
    }
}
