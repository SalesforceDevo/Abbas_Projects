/******
 * Use Case: Automatically create follow-up tasks for opportunities that are moved to the "Closed Won" stage 
 * and update a custom field to track the win date.
 * 
*******/
trigger OpportunityStageTrigger on Opportunity (after update) {
    // Initialize a list to hold tasks for bulk insertion
    List<Task> tasksToInsert = new List<Task>();

    // Iterate over all the updated opportunities
    for (Opportunity opp : Trigger.new) {
        Opportunity oldOpp = Trigger.oldMap.get(opp.Id);

        // Check if the stage has changed to 'Closed Won'
        if (opp.StageName == 'Closed Won' && oldOpp.StageName != 'Closed Won') {
            // Update a custom field with the date when the opportunity was won
            opp.Win_Date__c = Date.today();
            
            // Create a follow-up task for the opportunity owner
            Task followUpTask = new Task(
                WhatId = opp.Id,
                OwnerId = opp.OwnerId,
                Subject = 'Follow-up on Closed Won Opportunity',
                ActivityDate = Date.today().addDays(7), // Set due date to 7 days from now
                Status = 'Not Started',
                Priority = 'High'
            );

            // Add task to the list
            tasksToInsert.add(followUpTask);
        }
    }

    // Insert all the follow-up tasks if any were created
    if (!tasksToInsert.isEmpty()) {
        try {
            insert tasksToInsert;
        } catch (DmlException e) {
            System.debug('Error inserting tasks: ' + e.getMessage());
        }
    }
}