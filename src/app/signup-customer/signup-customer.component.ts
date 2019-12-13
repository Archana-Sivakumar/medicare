import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../site/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../site/auth.service';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-signup-customer',
  templateUrl: './signup-customer.component.html',
  styleUrls: ['./signup-customer.component.css']
})
export class SignupCustomerComponent implements OnInit {

  userForm: FormGroup;
  customerId: number;
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  contactNumber: number;
  altContactNumber: number;
  emailId: string;
  addressLineOne: number;
  addressLineTwo: number;
  city: string;
  state: string;
  zipcode: number;
  status: any = 0;
  password: string;
  signUpStatus: boolean = false;
  securityQuestionArray: string[];
  securityQuestion:string;
  securityAnswer: any;

  editStatus : any = false;


  constructor(private route: Router,
              private authService : AuthService,
              private doctorService : DoctorService,
              private userService : UserService,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit() {

    this.securityQuestionArray = ["What is your Favorite movie?", "Who is your favorite hero?", "What is your nick name?"];
    this.userForm = new FormGroup({

      "username": new FormControl(this.userName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "firstName": new FormControl(this.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "lastName": new FormControl(this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "age": new FormControl(this.age, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      "gender": new FormControl(this.gender),
      "dateOfBirth": new FormControl(this.dateOfBirth, [Validators.required]),
      "contactNumber": new FormControl(this.contactNumber, [Validators.required,  Validators.max(9999999999),Validators.min(1000000000)]),
      "altContactNumber": new FormControl(this.altContactNumber, [Validators.required,  Validators.max(9999999999),Validators.min(1000000000)]),
      "emailId": new FormControl(this.emailId, [Validators.required, Validators.maxLength(50)]),
      "password": new FormControl(this.password, [Validators.required, Validators.minLength(5)]),
      "securityQuestion": new FormControl(this.securityQuestion),
      "securityAnswer": new FormControl(this.securityAnswer, [Validators.required]),
      "addressLineOne": new FormControl(this.addressLineOne, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "addressLineTwo": new FormControl(this.addressLineTwo),
      "city": new FormControl(this.city, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "state": new FormControl(this.state, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      "zipcode": new FormControl(this.zipcode, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),


    });
  
  }

  send(userForm) {
    this.userService.addUser(userForm.value).subscribe((response) => {
      this.route.navigate(['login', 1]);
    },
      (responseError) => {
        if (responseError.error.message === 'User already exists') {
          this.route.navigate(['login', 2]);
        }
      });

  }
  login() {
    this.route.navigate(['login']);
  }
  back() {
    this.route.navigate(['']);
  }

}

