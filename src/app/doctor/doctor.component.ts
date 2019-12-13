import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AdminService } from '../admin.service';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../site/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  medicareServiceList : any = [];
  requestList : any;
  doctorStatus : any ;
  homeStatus : any = true;
  notificationStatus : any = false;
  acceptStatus : any = false;
  rejectStatus : any = false;
  emptyStatus : any = false;
  updateTestStatus: any = false;
  profile : any;
  doctorList:any;
  doctorId:any;

  constructor(
              private  activatedRoute: ActivatedRoute,
              private doctorService : DoctorService,
              private adminService: AdminService,
              private requestService : RequestService,
              private route: Router,
              private authService : AuthService) { }

  ngOnInit() {

    this.adminService.getAllDoctorsList()
      .subscribe((response) => {
        this.doctorList = response;
    for(let i=0;i<this.doctorList.length;i++){
      if(this.authService.getUser()==this.doctorList[i].userName){
        this.doctorId = this.doctorList[i].doctorId;
      }
    }

    this.activatedRoute.paramMap.subscribe(params => {
      this.updateTestStatus = params.get('status');

    
    this.adminService.getAllMedicare().subscribe(response => {
      this.medicareServiceList = response;

    this.requestService.getOneDoctor(this.doctorId).subscribe((response) => {
      this.profile = response;
  
      console.log(this.profile);
            
      })

    })
  })
  })
  }

  add(id){
    let status : any;
    this.doctorService.addMedicareService(id).subscribe((response) => {
      status = response;

    if(status == true){
      this.doctorStatus = 1;
    }else{
      this.doctorStatus = 2;
    }
  });
  }

  

  accept(id){
    console.log(id)
    let OneRequestPojo;

    this.requestService.getOneRequest(id).subscribe((response) => {
      OneRequestPojo = response;
      let request = {
                "reqId" : OneRequestPojo.reqId,
                "patient" : OneRequestPojo.patient,
                "medicareService" : OneRequestPojo.medicareService,
                "doctor" : OneRequestPojo.doctor,
                "active" : "Accepted",
               "date" : OneRequestPojo.date
      }
   
    this.requestService.acceptRequest(request).subscribe((response) => {
      this.acceptStatus = response;
      console.log(this.acceptStatus);
      this.requestService.doctorViewRequest().subscribe((response) => {
        this.requestList = response;
  
        if(this.requestList.length == 0){
          this.emptyStatus = true;
        }
        console.log(this.requestList);
      });
     
    });
  });
  }

  reject(id){

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

    this.requestService.acceptRequest(request).subscribe((response) => {
      this.rejectStatus = response;
      console.log(this.rejectStatus);
      this.requestService.doctorViewRequest().subscribe((response) => {
        this.requestList = response;
  
        if(this.requestList.length == 0){
          this.emptyStatus = true;
        }
        console.log(this.requestList);
      });
    });
  });
  }

  notifications(){
    this.homeStatus = false;
    this.doctorStatus = false;
    this.updateTestStatus=false;
    this.requestService.doctorViewRequest().subscribe((response) => {
      this.requestList = response;

      if(this.requestList.length == 0){
        this.emptyStatus = true;
      }
      console.log(this.requestList);
    });
  }

  home(){
    this.homeStatus = true;
    this.notificationStatus = false;
    this.doctorStatus = false;
  }

  logout(){
    this.authService.logout();
  }
  update(reqId){
    this.route.navigate(['testResult',reqId]);
  }
}
