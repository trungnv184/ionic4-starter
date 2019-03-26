import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Customer} from '../datatypes/customer';
import {CustomerService} from './customer.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerResolve implements Resolve<Customer> {
    constructor(private customerService: CustomerService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.customerService.getCustomer(route.paramMap.get('id'));
    }
}
