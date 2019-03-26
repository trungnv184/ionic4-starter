import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerResolve} from './customer-detail/services/customer-resolve.service';

const routes: Routes = [
    {path: '', redirectTo: 'customers', pathMatch: 'full'},
    {path: 'customers', loadChildren: './customers/customers.module#HomePageModule'},
    {path: 'customer-detail', loadChildren: './customer-detail/customer-detail.module#CustomerDetailPageModule'},
    {path: 'customer-detail', loadChildren: './customer-detail/customer-detail.module#CustomerDetailPageModule'},
    {
        path: 'customer-detail/:id',
        loadChildren: './customer-detail/customer-detail.module#CustomerDetailPageModule',
        resolve: {
            customer: CustomerResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
