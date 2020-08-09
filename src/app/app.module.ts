import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortByTypePipe } from './sort-by-type.pipe';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { CarSelectComponent } from './car-select/car-select.component';
import { CarOrderComponent } from './car-order/car-order.component';
import { UserRentalsHistoryComponent } from './user-rentals-history/user-rentals-history.component';
import { EmployeeComponent } from './employee/employee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminAreaComponent } from './Manager Area/admin-area/admin-area.component';
import { ManageCarsComponent } from './Manager Area/manage-cars/manage-cars.component';
import { ManageCarTypesComponent } from './Manager Area/manage-car-types/manage-car-types.component';
import { ManageOrdersComponent } from './Manager Area/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './Manager Area/manage-users/manage-users.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FileSelectDirective } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarSelectComponent,
    SortByTypePipe,
    EmployeeComponent,
    CarOrderComponent,
    UserRentalsHistoryComponent,
    SignUpFormComponent,
    AdminAreaComponent,
    ContactUsComponent,
    ManageCarsComponent,
    ManageCarTypesComponent,
    ManageOrdersComponent,
    ManageUsersComponent,
    LoginFormComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
