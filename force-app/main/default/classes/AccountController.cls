public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Service_Vendors__c> getAccounts() {
        return [
            SELECT Id, Name, Address__c, High_Level_Overview__c,Size__c
            FROM Service_Vendors__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}
