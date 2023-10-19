import { LightningElement, wire, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Service_Vendors__c.Name';
import LOCATION_FIELD from '@salesforce/schema/Service_Vendors__c.Address__c';
import OVERVIEW_FIELD from '@salesforce/schema/Service_Vendors__c.High_Level_Overview__c';

import getAccounts from '@salesforce/apex/AccountController.getAccounts';
//import { reduceErrors } from 'c/ldsUtils';
const COLUMNS = [
    { label: 'Account Name', fieldName: 'AccountName', type: 'url', 
    typeAttributes: {
        label: {
            fieldName: NAME_FIELD.fieldApiName
        },
        target: "_top"
    }
    },
    { label: 'Location', fieldName: LOCATION_FIELD.fieldApiName, type: 'text' },
    { label: 'Overview', fieldName: OVERVIEW_FIELD.fieldApiName, type: 'text' }
   
];

export default class AccountList extends LightningElement {

    availableAccounts;
    error;
    columns = COLUMNS;
    @wire(getAccounts)
    wiredAccount( { error, data } ) {

        if ( data ) {

            let tempRecs = [];
            data.forEach( ( record ) => {
                let tempRec = Object.assign( {}, record );  
                tempRec.AccountName = '/lightning/r/Service_Vendors__c/' + tempRec.Id +'/view';
                tempRecs.push( tempRec );
                
            });
            this.availableAccounts = tempRecs;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.availableAccounts = undefined;

        }

    }
   /*
    connectedCallback(){
        getAccounts().then(response => {
            this.lstAccounts = response;
            if(this.lstAccounts){
                this.lstAccounts.forEach(item => item['AccountURL'] = '/lightning/r/Service_Vendors__c/' +item['Id'] +'/view');
                
            }
        }).catch(error => {
            console.log('Error: ' +error);
        });
        */
      /*  getAccounts()
        .then(result => {
          let tempAccts = [];
          result.forEach(acct=>{
            let newAcct = JSON.parse(JSON.stringify(acct));
            newAcct.LinkUrl = '/lightning/r/Service_Vendors__c/${acct.Id}/view' ; 
            tempAccts.push(newAcct);
          });
          this.tableData = tempAccts;
        })
        .catch(error => {
          this.error = error;
        });
    }*/
                                
}
