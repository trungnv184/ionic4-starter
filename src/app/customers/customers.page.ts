import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer-detail/services/customer.service';
import {Customer} from '../customer-detail/datatypes/customer';
import {Router} from '@angular/router';
import {ModelManagerService} from '../model-manager.service';
import {AlertController, IonItemSliding, NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'customers.page.html',
    styleUrls: ['customers.page.scss']
})
export class CustomersPage implements OnInit {
    customers: Customer[] = [];

    constructor(public router: Router,
                public navCtrl: NavController,
                public alertCtrl: AlertController,
                public modelManagerService: ModelManagerService,
                public customerService: CustomerService) {
    }

    ngOnInit() {
        this.modelManagerService.loadModel()
            .then(() => {
                this.customerService.getCustomers();
                this.customers = this.customerService.customers;
            });
    }

    navigateToCustomerDetailPage() {
        return this.router.navigate(['customer-detail']);
    }

    editCustomer(customer: Customer) {
        return this.router.navigate(['customer-detail', customer.id]);
    }

    async deleteCustomer(customer: Customer, itemSliding?: IonItemSliding) {
        const confirmationDeleteCustomer = await this.alertCtrl.create({
            header: 'Delete Customer Confirmation',
            message: 'Are you sure you want to delete customer?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        confirmationDeleteCustomer.present();
    }

    navigateToTheFirstCustomerDetailPage() {
        if (this.customerService.customers.length > 0) {
            const firstCustomer = this.customerService.customers[0];
            return this.navCtrl.navigateForward(`customer-detail/${firstCustomer.id}`);
        }

    }
}
