import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CustomerDetailPage} from './customer-detail.page';
import {CustomerResolve} from './services/customer-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: CustomerDetailPage
    },
    {
        path: 'customer-detail/:id',
        component: CustomerDetailPage,
        resolve: {
            customer: CustomerResolve
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CustomerDetailPage],
})
export class CustomerDetailPageModule {
}
