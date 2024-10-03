trigger ActiveContactsTrigger on Contact (after insert, after update, after delete, after undelete) {
    Set<Id> accountIds = new Set<Id>();

    // Handle insert, update, and undelete scenarios: Get Account IDs from Trigger.new
    if (Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete) {
        for (Contact con : Trigger.new) {
            accountIds.add(con.AccountId);
        }
    }

    // Handle delete scenario: Get Account IDs from Trigger.old
    if (Trigger.isDelete) {
        for (Contact con : Trigger.old) {
            accountIds.add(con.AccountId);
        }
    }

    // Query affected accounts and count the number of active contacts for each
    if (!accountIds.isEmpty()) {
        List<Account> accountsToUpdate = new List<Account>();
        
        // Query accounts along with their active contacts
        List<Account> accList = [
            SELECT Id, 
                   (SELECT Id FROM Contacts WHERE IsActive__c = true) 
            FROM Account 
            WHERE Id IN :accountIds
        ];

        // Update NumberofActiveContacts__c based on the number of active contacts
        for (Account acc : accList) {
            acc.NumberofActiveContacts__c = acc.Contacts.size(); // Set count of active contacts
            accountsToUpdate.add(acc);
        }

        // Update the accounts if there are any changes
        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }
}