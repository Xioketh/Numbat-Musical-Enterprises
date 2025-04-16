import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { CustomerHomeComponent } from './Components/Customer/customer-home/customer-home.component';
import { CustomerHeaderComponent } from './Components/Customer/customer-header/customer-header.component';
import { CustomerFooterComponent } from './Components/Customer/customer-footer/customer-footer.component';
import { LoginComponent } from './Components/login/login.component';
import { CustomerProductViewComponent } from './Components/Customer/customer-product-view/customer-product-view.component';
import { CustomerCartComponent } from './Components/Customer/customer-cart/customer-cart.component';
import { AdminSidenavComponent } from './Components/Admin/admin-sidenav/admin-sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminProductsComponent } from './Components/Admin/admin-add-products/admin-products.component';
import { AdminUsersComponent } from './Components/Admin/admin-users/admin-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './Services/product.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminProductsListComponent } from './Components/Admin/admin-products-list/admin-products-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminSalesComponent } from './Components/Admin/admin-sales/admin-sales.component';
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {NoAccessComponent} from "./Components/no-access/no-access.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Location } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    CustomerHomeComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    LoginComponent,
    CustomerProductViewComponent,
    CustomerCartComponent,
    AdminSidenavComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminProductsListComponent,
    SignUpComponent,
    AdminSalesComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    NgbModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    FontAwesomeModule
  ],
  providers: [
    ProductService,
    DatePipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    Location,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
