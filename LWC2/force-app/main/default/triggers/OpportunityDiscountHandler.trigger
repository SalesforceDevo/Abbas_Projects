// . This trigger updates related Opportunity Line Items when an Opportunity's discount percentage
//  exceeds a certain threshold, and sends a notification to the manager when the discount is above a critical level.

trigger OpportunityDiscountHandler on Opportunity (before update) {
    // Set a discount threshold
    Decimal discountThreshold = 0.15; // 15% discount
    Decimal criticalDiscountThreshold = 0.25; // 25% critical discount
    List<OpportunityLineItem> lineItemsToUpdate = new List<OpportunityLineItem>();
    Set<Id> opportunityIds = new Set<Id>();

    for (Opportunity opp : Trigger.new) {
        // Ensure the opportunity is not closed and the discount is over the threshold
        if (opp.StageName != 'Closed Won' && opp.Discount__c > discountThreshold) {
            opportunityIds.add(opp.Id);
        }

        // Critical discount alert logic
        if (opp.Discount__c > criticalDiscountThreshold) {
            // Send email notification to the opportunity owner manager
            sendDiscountAlert(opp);
        }
    }

    // Query Opportunity Line Items related to the Opportunities in the trigger
    if (!opportunityIds.isEmpty()) {
        List<OpportunityLineItem> lineItems = [
            SELECT Id, UnitPrice, Quantity, Discount__c, OpportunityId 
            FROM OpportunityLineItem 
            WHERE OpportunityId IN :opportunityIds
        ];

        // Update discount on line items based on opportunity discount
        for (OpportunityLineItem item : lineItems) {
            for (Opportunity opp : Trigger.new) {
                if (item.OpportunityId == opp.Id) {
                    item.Discount__c = opp.Discount__c; // Apply opportunity discount to line items
                    lineItemsToUpdate.add(item);
                }
            }
        }
        
        if (!lineItemsToUpdate.isEmpty()) {
            update lineItemsToUpdate; // Update the line items in bulk
        }
    }
}

// Helper method to send email notifications to the manager
public void sendDiscountAlert(Opportunity opp) {
    // Query the Opportunity Owner and their Manager
    User oppOwner = [SELECT Id, Name, Email, Manager.Email FROM User WHERE Id = :opp.OwnerId LIMIT 1];
    
    if (oppOwner.Manager.Email != null) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { oppOwner.Manager.Email });
        mail.setSubject('Critical Discount Alert on Opportunity: ' + opp.Name);
        mail.setPlainTextBody('Opportunity ' + opp.Name + ' has a discount of ' + (opp.Discount__c * 100) + '% which exceeds the critical threshold.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}
