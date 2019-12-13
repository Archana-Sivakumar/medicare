import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../site/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-test-result',
  templateUrl: './view-test-result.component.html',
  styleUrls: ['./view-test-result.component.css']
})
export class ViewTestResultComponent implements OnInit {

  testResultForm : FormGroup;
  viewTestPojo :any;
  viewTestResultList :any;
  requestId : any;
  
  constructor(private customerService: CustomerService,  
              private authService : AuthService,  
              private route: Router,
              private activatedRoute: ActivatedRoute,) { 

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
      this.requestId = params.get('id');

    this.customerService.getTestResult(this.requestId).subscribe((response)=>{
      this.viewTestResultList=response;
        

     this.testResultForm = new FormGroup({
      'patientName' : new FormControl(this.viewTestResultList.patientName),
      'doctorName': new FormControl(this.viewTestResultList.doctorName),
      'mediserviceName': new FormControl(this.viewTestResultList.mediserviceName),
      'mediserviceAmount': new FormControl(this.viewTestResultList.mediserviceAmount),
      'agentCommission': new FormControl(this.viewTestResultList.agentCommission),
      'testName1': new FormControl(this.viewTestResultList.testName1),
      'normalRange1' : new FormControl(this.viewTestResultList.normalRange1),
      'actualRange1' : new FormControl(this.viewTestResultList.actualRange1),
      'testName2': new FormControl(this.viewTestResultList.testName2),
      'normalRange2' : new FormControl(this.viewTestResultList.normalRange2),
      'actualRange2' : new FormControl(this.viewTestResultList.actualRange2)
      
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