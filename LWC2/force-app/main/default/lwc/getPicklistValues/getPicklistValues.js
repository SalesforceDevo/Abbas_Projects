import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE from  '@salesforce/schema/Account.Type';
import ACCOUNT from '@salesforce/schema/Account';

export default class GetPicklistValues extends LightningElement {
    value = '';            // Holds the selected value for the Industry picklist
    value_type = '';       // Holds the selected value for the Type picklist (This is the property I added)
    transformedData = [];  // Holds the options for the Industry picklist
    transformedData_type = []; // Holds the options for the Type picklist

    @wire(getObjectInfo, { objectApiName: ACCOUNT })
    recorddata;

    @wire(getPicklistValues, { 
        recordTypeId: '$recorddata.data.defaultRecordTypeId', 
        fieldApiName: TYPE 
    })
    getpicklistFnctType({ data, error }) { // Function for the Type picklist
        if (data) {
            console.log(data);
            this.transformedData_type = this.options(data); // Assign the transformed data to the reactive property
        }
        if (error) {
            console.error(error);
        }
    }

    @wire(getPicklistValues, { 
        recordTypeId: '$recorddata.data.defaultRecordTypeId', 
        fieldApiName: INDUSTRY_FIELD 
    })
    getpicklistFnctIndustry({ data, error }) { // Function for the Industry picklist
        if (data) {
            console.log(data);
            this.transformedData = this.options(data); // Assign the transformed data to the reactive property
        }
        if (error) {
            console.error(error);
        }
    }

    options(data) {
        return data.values.map(item => {
            return {
                label: item.label,
                value: item.value
            };
        });
    }

    handleChange(event) {
        this.value = event.detail.value; // Updates the value for Industry picklist
    }

    handleChange_type(event) {
        this.value_type = event.detail.value; // Updates the value for Type picklist
    }
}
