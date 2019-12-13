import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { AuthService } from '../site/auth.service';

@Component({
  selector: 'app-edit-medicare',
  templateUrl: './edit-medicare.component.html',
  styleUrls: ['./edit-medicare.component.css']
})
export class EditMedicareComponent implements OnInit {

  editMedicare: FormGroup;
  constructor(private doctorService : DoctorService,
              private route: Router,private authService : AuthService) { }

  ngOnInit() {
    this.editMedicare = new FormGroup({
      'medicareService': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'serviceDescription': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required]),
      'agentCommission': new FormControl('', [Validators.required]),
    })
  }
  
  editMedicareMethod(editMedicareForm){

    let status : any;
    this.doctorService.editMedicareService(editMedicareForm.value).subscribe((response) => {
      status = response;
    console.log(editMedicareForm.value+"Value")
    console.log(status);
    this.route.navigate(['admin',status]);
  });
  }

  back(){
    this.route.navigate(['doctor']);
  }

  logout(){
    this.authService.logout();
  }
  

}
