import { Component, OnInit } from '@angular/core';
import { AuthService } from '../site/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { AdminService } from '../admin.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  bookAppointment : FormGroup;
  medicareList : any ;
  doctorList : any = [];
  id : any;
  doctorPojo: any;
  constructor(private authService : AuthService,
              private route : Router,
              private adminService : AdminService,
              private activatedRoute: ActivatedRoute,
              private doctorService : DoctorService,
              private customerService : CustomerService, private requestService: RequestService) {

                this.bookAppointment = new FormGroup({
                  'medicareService': new FormControl(""),
                  'doctor': new FormControl(""),
                  'serviceDescription': new FormControl(""),
                  'amount': new FormControl(""),
                  'date' : new FormControl("")
                })
               }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');

    this.adminService.getOneMedicare(this.id).subscribe((response) => {
      this.medicareList = response;
      console.log(this.medicareList);
      this.doctorList = this.medicareList.doctor;
      console.log(this.doctorList);
    

    this.bookAppointment = new FormGroup({
      'medicareService': new FormControl(this.medicareList.medicareService),
      'doctor' : new FormControl(this.doctorList),
      'serviceDescription': new FormControl(this.medicareList.serviceDescription),
      'amount': new FormControl(this.medicareList.amount),
      'date' : new FormControl("")
    })
  })
  })

  }

  bookAppointmentMethod(bookAppointment){

    let user = this.authService.getUser();
    let customer ;
    this.doctorService.getOneCustomer(user).subscribe((response) => {
      customer = response;
    let doctorId=  bookAppointment.value.doctor;
    this.requestService.getOneDoctor(doctorId).subscribe((response)=>{
        
    this.doctorPojo=response;
  

    let appointment = {
     
      'patient' : customer,
      'medicareService' : this.medicareList,
      'doctor' : this.doctorPojo,
      'active': 'sent',
      'date' : bookAppointment.value.date
    }

    let status : any;
    this.customerService.bookAppointment(appointment).subscribe((response) => {
      status = response;
    this.route.navigate(['customer',status]);
  })
})
})
  }

  back(){
    this.route.navigate(['customer']);
  }
  
  logout(){
    this.authService.logout();
  }
}
