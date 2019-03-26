import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from './datatypes/customer';
import {CustomerService} from './services/customer.service';
import {UUIDService} from './services/uuid.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.page.html',
    styleUrls: ['./customer-detail.page.scss']
})
export class CustomerDetailPage implements OnInit {
    customer: Customer;
    formGroup: FormGroup;
    isSubmitted = false;

    constructor(public navCtrl: NavController,
                public customerService: CustomerService,
                public route: ActivatedRoute,
                public uuidService: UUIDService,
                public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.customer = this.route.snapshot.data['customer'];

        this.createCustomerFormGroup();

        if (this.customer) {
            this.setValueFormControls();
        }
    }

    navigateToHomePage() {
        this.navCtrl.back();
    }

    saveCustomer() {
        this.isSubmitted = true;

        if (!this.formGroup.valid) {
            return;
        }

        this.customer = {...this.customer, ...this.formGroup.value};

        if (!this.customer.id) {
            this.customer.id = this.uuidService.generateUUID();
        }


        this.customerService.saveCustomer(this.customer);

        this.navigateToHomePage();
    }

    get formControls() {
        return this.formGroup.controls;
    }

    isInValidControl(controlName: string): boolean {
        return this.isSubmitted && this.formControls[controlName].invalid;
    }

    createCustomerFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            phone: ['', Validators.compose([Validators.required, Validators.min(0)])],
            lastName: new FormControl(),
            address: new FormControl(),
            birthday: new FormControl(),
            email: new FormControl(),
            note: new FormControl(),
            gender: new FormControl(),
            city: new FormControl(),
            state: new FormControl(),
            zip: new FormControl()
        });
    }

    setValueFormControls() {
        this.formGroup.patchValue({
            firstName: this.customer.firstName,
            phone: this.customer.phone,
            lastName: this.customer.lastName,
            address: this.customer.address,
            birthday: this.customer.birthDay,
            email: this.customer.email,
            note: this.customer.note,
            gender: this.customer.gender,
            city: this.customer.city,
            state: this.customer.state,
            zip: this.customer.zip
        });
    }
}
