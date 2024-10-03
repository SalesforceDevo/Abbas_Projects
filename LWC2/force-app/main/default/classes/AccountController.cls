public with sharing class AccountController {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountList(){
    return [Select Id,Name,Type,Industry from Account Limit 5];
   }
   @AuraEnabled(cacheable=true)
   public static List<Account> filteredAccounts(String typeac ){
      return [Select Id,Name,Type,Industry from Account Where Type=:typeac Limit 5];
     }

     @AuraEnabled(cacheable=true)
     public static List<Account> findAccounts(String namelike ){
      String key ='%'+namelike+'%';
        return [Select Id,Name,Type,Industry from Account Where Name Like:key Limit 5];
       }
}