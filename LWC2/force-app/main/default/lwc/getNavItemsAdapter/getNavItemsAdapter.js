import { LightningElement,wire } from 'lwc';
import {getNavItems} from 'lightning/uiAppsApi'

export default class GetNavItemsAdapter extends LightningElement {
    result
    @wire(getNavItems,{navItemNames:['standard-Account'],pageSize:30})
    navdatafunction({data,error}){
if(data){
    console.log('List of NavItems:', data);
    this.result=data.navItems[0]
}
if(error){
    console.error(error)
}
    }
}