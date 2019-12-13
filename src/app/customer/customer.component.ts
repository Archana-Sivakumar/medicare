import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../site/auth.service';
import { RequestService } from '../request.service';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  doctorList: any;
  doctorLength : boolean = false;
  medicareList: any;
  requestListLength : boolean = false;
  appointmentStatus : any;
  profile : any;
  customerName: any;
  customerPojo: any;
  doctorStatus: boolean = false;
  medicareStatus: boolean = false;
  notificationStatus: boolean = false;
  customerId:any;
  requestList:any;

    constructor( 
                private authService : AuthService, 
                private customerService: CustomerService,
                private requestService: RequestService,
                private activateRoute: ActivatedRoute,
                private doctorService : DoctorService,
                private adminService : AdminService,
                private route : Router) { }

    ngOnInit() {

      this.activateRoute.paramMap
          .subscribe(params=> {
            this.appointmentStatus=params.get('status');
      
      this.doctorService.getOneCustomer(this.authService.getUser()).subscribe((response) => {
        this.profile = response;
      })

      
      this.customerService.getAllDoctorsList()
      .subscribe((response)=>{
          this.doctorList = response;
          this.doctorStatus = true;
        console.log(this.doctorList);
      })
    })

      this.customerService.getAllMedicare()
          .subscribe((response)=>{
              this.medicareList = response;
            console.log(this.medicareList);
      });

    }

    request(id){
      this.route.navigate(['bookAppointment',id]);
    }

    doctor() {

      this.appointmentStatus = false;
      this.doctorStatus = true;
      this.medicareStatus = false;
      this.notificationStatus = false;

      this.adminService.getAllDoctorsList()
        .subscribe((response) => {
          this.doctorList = response;

          if(this.doctorList.length == 0){
            this.doctorLength = true;
          }

          console.log(this.doctorList);
      });
    }

    medicareService() {

      this.appointmentStatus = false;
      this.doctorStatus = false;
      this.medicareStatus = true;
      this.notificationStatus = false;

      this.adminService.getAllMedicare()
      .subscribe((response) => {
        this.medicareList = response;
        console.log(this.medicareList);
      });
    }

    notification() {
      this.appointmentStatus = false;
      this.customerName=this.authService.getUser();

      this.doctorService.getOneCustomer(this.customerName).subscribe((response)=>{
        this.customerPojo = response;
        this.customerId=this.customerPojo.id;

      this.requestService.customerViewRequest(this.customerId)
        .subscribe((response) => {
          this.doctorStatus = false;
          this.notificationStatus = true;
          this.medicareStatus = false;
          this.requestList = response;
        
          if(this.requestList.length == 0) {
              this.requestListLength = true;
          }
      })
    })
  }

  view(requestId){
    this.route.navigate(['viewTestResult',requestId]);
  }

  logout(){
    this.authService.logout();
  }
  }
