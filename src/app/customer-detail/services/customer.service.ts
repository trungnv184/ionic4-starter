import {Injectable} from '@angular/core';
import {Customer} from '../datatypes/customer';
import * as _ from 'lodash';
import {ModelManagerService} from '../../model-manager.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    customers: Customer[] = [];

    constructor(private modelManagerService: ModelManagerService) {
    }

    getCustomers(): Customer[] {
        this.customers = this.modelManagerService.getModel().customers;
        return this.customers;
    }

    getCustomer(customerId: string): Customer {
        return _.find(this.customers, (customer) => _.isEqual(customer.id, customerId));
    }

    async saveCustomer(customerToSave: Customer): Promise<any> {
        const customerIndex = _.findIndex(this.customers, (customer) => _.isEqual(customer.id, customerToSave.id));

        if (customerIndex >= 0) {
            this.customers[customerIndex] = {...this.customers[customerIndex], ...customerToSave};
        } else {
            this.customers.push(customerToSave);
        }

        this.modelManagerService.getModel().customers = [...this.customers];

        return this.modelManagerService.storeModel();
    }
}
