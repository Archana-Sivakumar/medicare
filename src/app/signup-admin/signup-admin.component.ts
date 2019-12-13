import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../site/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  userForm:FormGroup;
  adminId: number;
  userName: string;
  firstName: string;
  lastName: string;
  age:number;
  gender:string;
  dateOfBirth:string;
  contactNumber: number;
  altContactNumber:number;
  emailId: string;
  password: string;
  signUpStatus: boolean=false;
  status:  any = false;
    constructor(private route: Router,
                private userService : UserService) { }
  
    ngOnInit() {
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
        
      });
    }
       send(userForm) {  
           this.userService.addAdmin(userForm.value).subscribe((response) => {
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
