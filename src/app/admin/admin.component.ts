import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { RequestService } from '../request.service';
import { AuthService } from '../site/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userForm: any;
  doctorList: any;
  customerList: any;
  medicareList: any;
  requestList: any;
  userList : any;
  customerStatus: boolean = false;
  doctorStatus: boolean = false;
  notificationStatus: boolean = false;
  medicareStatus: boolean = false;
  approveStatus: boolean = false;
  homeStatus : boolean = false;
  customerLength : boolean = false;
  doctorLength : boolean = false;
  approveLength : boolean = false;
  acceptedStatus: boolean = false;
  rejectedStatus: boolean = false;
  addMedicareStatus : any = false;
  requestListLength : boolean = false;
 
  constructor(private adminService: AdminService,
    private requestService: RequestService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {

    this.activateRoute.paramMap
      .subscribe(params => {
        this.addMedicareStatus = params.get('status');
      })
      
  }
 
  notification() {

    this.addMedicareStatus = false;

    this.requestService.adminViewRequest()
      .subscribe((response) => {
        this.doctorStatus = false;
        this.customerStatus = false;
        this.notificationStatus = true;
        this.medicareStatus = false;
        this.approveStatus = false;
        this.requestList = response;
        if (this.requestList.length == 0) {
          this.requestListLength = true;
        }
      })

  }

  doctor() {

    this.doctorStatus = true;
    this.approveStatus = false;
    this.addMedicareStatus = false;
    this.homeStatus = false;
    this.customerStatus = false;
    this.notificationStatus = false;
    this.medicareStatus = false;

    this.adminService.getAllDoctorsList()
      .subscribe((response) => {
        this.doctorList = response;

        if(this.doctorList.length == 0){
          this.doctorLength = true;
        }
      
        console.log(this.doctorList);
    });
    
  }

  customer() {

    this.customerStatus = true;
    this.approveStatus = false;
    this.addMedicareStatus = false;
    this.homeStatus = false;
    this.doctorStatus = false;
    this.notificationStatus = false;
    this.medicareStatus = false;

    this.adminService.getAllCustomersList()
      .subscribe((response) => {
        this.customerList = response;

        if(this.customerList.length == 0){
          this.customerLength = true;
        }
        
      });

  }

  medicare() {

    this.medicareStatus = true;
    this.approveStatus = false;
    this.addMedicareStatus = false;
    this.homeStatus = false;
    this.doctorStatus = false;
    this.customerStatus = false;
    this.notificationStatus = false;

    this.adminService.getAllMedicare()
      .subscribe((response) => {
        this.medicareList = response;
        console.log(this.medicareList);
      });
    
  }

  
  acceptRequest(id) {

    console.log(id + "$$$$$")
    let OneRequestPojo;

    this.requestService.getOneRequest(id).subscribe((response) => {

      OneRequestPojo = response;
      console.log(OneRequestPojo);
      let request = {
                "reqId" : OneRequestPojo.reqId,
                "patient" : OneRequestPojo.patient,
                "medicareService" : OneRequestPojo.medicareService,
                "doctor" : OneRequestPojo.doctor,
                "active" : "Pending",
               "date" : OneRequestPojo.date
      }

      this.requestService.acceptRequest(request).subscribe((response) => {
        this.acceptedStatus = true;
        this.requestService.adminViewRequest()
        .subscribe((response) => {
          this.requestList = response;
          if (this.requestList.length == 0) {
            this.requestListLength = true;
          }
        })
        console.log("true");

      });
    });


  }

  rejectRequest(id) {

    let OneRequestPojo;

    this.requestService.getOneRequest(id).subscribe((response) => {
      OneRequestPojo = response;

      let request = {
                "reqId" : OneRequestPojo.reqId,
                "patient" : OneRequestPojo.patient,
                "medicareService" : OneRequestPojo.medicareService,
                "doctor" : OneRequestPojo.doctor,
                "active" : "Rejected",
                "date" : OneRequestPojo.date
      }

      this.requestService.rejectRequest(request).subscribe((response) => {
        this.rejectedStatus = true;
        this.requestService.adminViewRequest()
        .subscribe((response) => {
          this.requestList = response;
          if (this.requestList.length == 0) {
            this.requestListLength = true;
          }
        })
        console.log("true");
      });
    });

  }
  

  approve(){

    this.approveStatus = true;
    this.addMedicareStatus = false;
    this.homeStatus = false;
    this.doctorStatus = false;
    this.customerStatus = false;
    this.notificationStatus = false;
    this.medicareStatus = false;

    this.adminService.getAllUsers()
      .subscribe((response) => {
        this.userList = response;

        if(this.userList.length == 0){
          this.approveLength = true;
        }
        console.log(this.userList);
      });

  }


  logout() {

    this.authService.logout();
  }

  accept(id) {

    let user

    this.adminService.getOneUser(id)
      .subscribe((response) => {
        user = response;
        console.log(user);
     
      user.approve = "ACCEPTED";

      this.adminService.editUser(user)
        .subscribe((response) => {
          this.acceptedStatus = true;
          this.userList = response;

          if(this.userList.length == 0){
            this.approveLength = true;
          }
          
      });
    });

  }

  reject(id) {

    let user

    this.adminService.getOneUser(id)
      .subscribe((response) => {
        user = response;
        console.log(user);
     
      user.approve = "REJECTED";

      this.adminService.editUser(user)
        .subscribe((response) => {
          this.rejectedStatus = true;
          this.userList = response;

          if(this.userList.length == 0){
            this.approveLength = true;
          }     
      });
    });
  }

  home(){

    this.approveStatus = false;
    this.addMedicareStatus = false;
    this.homeStatus = true;
    this.doctorStatus = false;
    this.customerStatus = false;
    this.notificationStatus = false;
    this.medicareStatus = false;

  }

  addMedicareService() {
    this.route.navigate(['editMedicare']);
  }


}
