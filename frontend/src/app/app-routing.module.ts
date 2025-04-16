import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { CustomerHomeComponent } from './Components/Customer/customer-home/customer-home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminSidenavComponent } from './Components/Admin/admin-sidenav/admin-sidenav.component';
import { AdminSalesComponent } from './Components/Admin/admin-sales/admin-sales.component';
import { AdminProductsComponent } from './Components/Admin/admin-add-products/admin-products.component';
import { AdminUsersComponent } from './Components/Admin/admin-users/admin-users.component';
import { AdminProductsListComponent } from './Components/Admin/admin-products-list/admin-products-list.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './Auth/auth.guard';
import {NoAccessComponent} from "./Components/no-access/no-access.component";

const routes: Routes = [

  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:CustomerHomeComponent},
  {path:'forbidden',component:NoAccessComponent},
  {path:'login',component:LoginComponent},
  {path:'login/signup',component:SignUpComponent},
  {path:'admin',component:AdminSidenavComponent,canActivate:[AuthGuard], data:{roles:['Admin']},
    children:[
      {path:'',component:AdminDashboardComponent},
      {path:'dashboard',component:AdminDashboardComponent},
      {path:'sales',component:AdminSalesComponent},
      {path:'product-list',component:AdminProductsListComponent},
      {path:'product-list/addproduct', component: AdminProductsComponent },
      {path:'users',component:AdminUsersComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
