import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupDoctorComponent } from './signup-doctor/signup-doctor.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { InitialComponent } from './initial/initial.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { SignupAgentComponent } from './signup-agent/signup-agent.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { SignupCustomerComponent } from './signup-customer/signup-customer.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { EditMedicareComponent } from './edit-medicare/edit-medicare.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ViewTestResultComponent } from './view-test-result/view-test-result.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupDoctorComponent,
    SignupAdminComponent,
    InitialComponent,
    AdminComponent,
    CustomerComponent,
    DoctorComponent,
    SignupAgentComponent,
    LoginPasswordComponent,
    SignupCustomerComponent,
    BookAppointmentComponent,
    EditMedicareComponent,
    TestResultComponent,
    ViewTestResultComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
