import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import VENDOR_OBJECT from '@salesforce/schema/Service_Vendors__c';
import NAME_FIELD from '@salesforce/schema/Service_Vendors__c.Name';
import ADDRESS_FIELD from '@salesforce/schema/Service_Vendors__c.Address__c';
import OVERVIEW_FIELD from '@salesforce/schema/Service_Vendors__c.High_Level_Overview__c';
import ACCOUNT_FIELD from '@salesforce/schema/Service_Vendors__c.Account__c';


export default class CreateServiceVendorAccount extends LightningElement {
    objectApiName = VENDOR_OBJECT;
    fields = [NAME_FIELD, ADDRESS_FIELD, OVERVIEW_FIELD, ACCOUNT_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Vendor Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}