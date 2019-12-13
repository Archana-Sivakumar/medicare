import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../site/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../site/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup-doctor',
  templateUrl: './signup-doctor.component.html',
  styleUrls: ['./signup-doctor.component.css']
})
export class SignupDoctorComponent implements OnInit {

  userForm:FormGroup;
  doctorId: number;
  userName: string;
  firstName: string;
  lastName: string;
  age:number;
  gender:string;
  dateOfBirth:string;
  contactNumber: number;
  altContactNumber:number;
  emailId: string;
  addressLineOne: number;
  addressLineTwo: number;
  city: string;
  state: string;
  zipcode: number;
  password: string;
  degree: string;
  speciality: string;
  workhours: number;
  hospitalName: string;
  medicareService: any;
  signUpStatus: boolean=false;
  status: any = 0;
  securityQuestionArray: string[];
  securityQuestion:string;
  securityAnswer:string;
    constructor(private authenticateService: AuthService,
                private httpClient: HttpClient,
                private userService : UserService,
                private route: Router) { }
  
    ngOnInit() {
  
      this.securityQuestionArray = ["What is your Favorite movie?","Who is your favorite hero?", "What is your nick name?"];
         
     
       this.userForm= new FormGroup({
  
  
        "userName": new FormControl(this.userName,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        "firstName": new FormControl(this.firstName,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        "lastName": new FormControl(this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        "age": new FormControl(this.age, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        "gender":  new FormControl(this.gender),
        "dateOfBirth":  new FormControl(this.dateOfBirth, [Validators.required]),
        "contactNumber":  new FormControl(this.contactNumber, [Validators.required,  Validators.max(9999999999),Validators.min(1000000000)]),
        "altContactNumber":  new FormControl(this.altContactNumber,  [Validators.required,  Validators.max(9999999999),Validators.min(1000000000)]),
        "emailId": new FormControl(this.emailId, [Validators.required, Validators.maxLength(50)]),
         "password": new FormControl(this.password, [Validators.required, Validators.minLength(5)]),
         "securityQuestion": new FormControl(this.securityQuestion),
         "securityAnswer": new FormControl(this.securityAnswer, [Validators.required]),
        "addressLineOne": new FormControl(this.addressLineOne, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        "addressLineTwo": new FormControl(this.addressLineTwo),
        "city": new FormControl(this.city,  [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
        "state": new FormControl(this.state, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
        "zipcode": new FormControl(this.zipcode, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
        "degree": new FormControl(this.degree, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
        "speciality": new FormControl(this.speciality, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
        "workhours": new FormControl(this.workhours),
        "hospitalName": new FormControl(this.hospitalName, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      
         });
      }
      
  
    send(userForm){
      console.log(userForm.value.securityAnswer);
      this.userService.addDoctor(userForm.value).subscribe((response) => {
        this.route.navigate(['login',1]);
        }, 
          (responseError) => {
            if(responseError.error.message === 'User already exists') {
              this.route.navigate(['login',2]);
            }
          });
    }
  
    login(){
      this.route.navigate(['login']);
    }
    back(){
      this.route.navigate(['']);
    }

}

