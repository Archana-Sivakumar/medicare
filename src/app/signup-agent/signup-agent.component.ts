import { Component, OnInit } from '@angular/core';
import { UserService } from '../site/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-agent',
  templateUrl: './signup-agent.component.html',
  styleUrls: ['./signup-agent.component.css']
})
export class SignupAgentComponent implements OnInit {

  userForm:FormGroup;
  customerId: number;
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
  status: boolean = false;
  password: string;
  signUpStatus: boolean=false;
  securityQuestionArray: string[];
  securityQuestion:string;
  securityAnswer: any;
  
    constructor(private userService: UserService, private route: Router){}
  
    ngOnInit() {
  
      this.securityQuestionArray = ["What is your Favorite movie?","Who is your favorite hero?", "What is your nick name?"];
  
       this.userForm= new FormGroup({
     
         "username": new FormControl(this.userName,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
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
       
        
      });
    }
  
    send(userForm) {  
      this.userService.addAgent(userForm.value).subscribe((response) => {
        this.route.navigate(['login', 1]);
  }, 
   (responseError) => {
     if(responseError.error.message === 'User already exits:(') {
      this.route.navigate(['login', 2]);
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
