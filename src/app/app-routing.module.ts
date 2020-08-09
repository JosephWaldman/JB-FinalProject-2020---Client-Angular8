import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CarSelectComponent } from './car-select/car-select.component';
import { CarOrderComponent } from './car-order/car-order.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { UserRentalsHistoryComponent } from './user-rentals-history/user-rentals-history.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminAreaComponent } from './Manager Area/admin-area/admin-area.component';
import { ManageCarTypesComponent } from './Manager Area/manage-car-types/manage-car-types.component';
import { ManageCarsComponent } from './Manager Area/manage-cars/manage-cars.component';
import { ManageOrdersComponent } from './Manager Area/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './Manager Area/manage-users/manage-users.component';


CarOrderComponent

const routes: Routes = [
  {path:"",redirectTo:'/Home',pathMatch:'full'}, // בהזנת הכתובת המקומית, יבצע ראוט למסך הבית
  {path:"Home",component:HomeComponent},
  {path:"LoginForm",component:LoginFormComponent},
  {path:"ContactUs",component:ContactUsComponent},
  {path:"CarSelect",component:CarSelectComponent},
  {path:"CarOrder",component:CarOrderComponent},
  {path:"SignUpForm",component:SignUpFormComponent},
  {path:"UserRentalsHistory",component:UserRentalsHistoryComponent},
  {path:"Employee",component:EmployeeComponent},
  {path:"Manager",component:AdminAreaComponent,
    children:[   // נסטד ראוטינג
      {path:"ManageCarTypes",component:ManageCarTypesComponent},
      {path:"ManageCars",component:ManageCarsComponent},
      {path:"ManageOrders",component:ManageOrdersComponent},
      {path:"ManageUsers",component:ManageUsersComponent}
    ]},
  {path:"**",redirectTo:'/Home'} // בכל שגיאה בכתיבה לאחר שם הכתובת המקומית, יבצע ראוט למסך הבית
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
