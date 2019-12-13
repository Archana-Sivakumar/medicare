import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RequestService } from '../request.service';
import { DoctorService } from '../doctor.service';
import { AuthService } from '../site/auth.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  testResultForm: FormGroup;
  patientName: any;
  testNameArray:any=[];
  normalRangeArray:any=[];
  medicareList: any=[];
  requestPojo:any;
  id: any;
  testNameList: any;
  constructor(private activatedRoute: ActivatedRoute,
    private adminService : AdminService, private requestService: RequestService, private doctorService: DoctorService, private route: Router,private authService:AuthService) { 

    
    this.testResultForm = new FormGroup({
      'patientName' : new FormControl(""),
      'doctorName': new FormControl(""),
      'mediserviceName': new FormControl(""),
      'mediserviceAmount': new FormControl(""),
      'agentCommission': new FormControl(""),
      'testName1': new FormControl(""),
      'normalRange1' : new FormControl(""),
      'actualRange1' : new FormControl(""),
      'testName2': new FormControl(""),
      'normalRange2' : new FormControl(""),
      'actualRange2' : new FormControl("")
    })
   }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      
    this.requestService.getOneRequest(this.id).subscribe((response)=>{
       this.requestPojo=response;
    
    this.testResultForm = new FormGroup({
      'patientName' : new FormControl(this.requestPojo.patient.username),
      'doctorName': new FormControl(this.requestPojo.doctor.userName),
      'mediserviceName': new FormControl(this.requestPojo.medicareService.medicareService),
      'mediserviceAmount': new FormControl(this.requestPojo.medicareService.amount),
      'agentCommission': new FormControl(this.requestPojo.medicareService.agentCommission),

      'testName1': new FormControl(this.requestPojo.medicareService.testResultName[0].testName),
      'normalRange1' : new FormControl(this.requestPojo.medicareService.testResultName[0].normalRange),
      'actualRange1' : new FormControl(""),
      'testName2': new FormControl(this.requestPojo.medicareService.testResultName[1].testName),
      'normalRange2' : new FormControl(this.requestPojo.medicareService.testResultName[1].normalRange),
      'actualRange2' : new FormControl(""),
      
    })
  })
  })

  

  }
  testResultMethod(testResultForm){

    let testResult = {

      'patientName' : this.requestPojo.patient.username,
      'doctorName': this.requestPojo.doctor.userName,
      'mediserviceName': this.requestPojo.medicareService.medicareService,
      'mediserviceAmount': this.requestPojo.medicareService.amount,
      'agentCommission': this.requestPojo.medicareService.agentCommission,
      'testName1': this.requestPojo.medicareService.testResultName[0].testName,
      'normalRange1' : this.requestPojo.medicareService.testResultName[0].normalRange,
      'actualRange1' : testResultForm.value.actualRange1,
      'testName2': this.requestPojo.medicareService.testResultName[1].testName,
      'normalRange2' : this.requestPojo.medicareService.testResultName[1].normalRange,
      'actualRange2' : testResultForm.value.actualRange2,
      'request' : this.requestPojo,

    }
    let status : any;
    this.doctorService.updateTestResult(testResult).subscribe((response) => {
      status = response;
      let OneRequestPojo;
    this.requestService.getOneRequest(this.id).subscribe((response) => {
      OneRequestPojo = response;
      OneRequestPojo.active = "Updated"
      this.requestService.acceptRequest(OneRequestPojo).subscribe((response) => {
    this.route.navigate(['doctor',status]);
  });
});
  });
  }
  back(){
    this.route.navigate(['doctor']);
  }

  logout(){
    this.authService.logout();
  }
}
