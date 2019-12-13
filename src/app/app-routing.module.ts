import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InitialComponent} from './initial/initial.component';
import {LoginComponent} from './login/login.component';
import {SignupAdminComponent} from './signup-admin/signup-admin.component';
import { SignupDoctorComponent } from './signup-doctor/signup-doctor.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { SignupCustomerComponent } from './signup-customer/signup-customer.component';
import { SignupAgentComponent } from './signup-agent/signup-agent.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { EditMedicareComponent } from './edit-medicare/edit-medicare.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ViewTestResultComponent } from './view-test-result/view-test-result.component';



const routes: Routes = [
  {path:'', component:InitialComponent},
  {path:'login', component: LoginComponent},
  {path:'login/:status', component: LoginComponent},
  {path:'signup-admin', component: SignupAdminComponent},
  {path:'signup-customer', component: SignupCustomerComponent},
  {path:'signup-doctor', component: SignupDoctorComponent},
  {path:'signup-agent', component: SignupAgentComponent},
  {path:'admin', component: AdminComponent},
  {path:'doctor', component: DoctorComponent},
  {path:'doctor/:status', component: DoctorComponent},
  {path:'admin/:status', component: AdminComponent},
  {path:'customer', component: CustomerComponent},
  {path:'customer/:status', component: CustomerComponent},
  {path:'editMedicare', component: EditMedicareComponent},
  {path:'bookAppointment/:id', component: BookAppointmentComponent},
  {path:'testResult/:id', component: TestResultComponent},
  {path:'viewTestResult/:id', component: ViewTestResultComponent},
   {path:'login-password/:initialRole',component:LoginPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
