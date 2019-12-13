import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../site/auth.service';
import { AdminService } from '../admin.service';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../site/user.service';
import { CustomerService } from '../customer.service';
import { RequestService } from '../request.service';
@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {
  userForm: FormGroup;
  username: string;
  firstName: string;
  lastName : string;
  securityQuestion : any;
  securityAnswer: any;
  customerList : any;
  invalidStatus : boolean = false;
  password: string;
  initialRole : any;
  status : any = false;
  doctorList: any;
  doctorId: any;
  doctorPojo:any;
    constructor(
               private doctorService :  DoctorService,
               private activateRoute: ActivatedRoute,
               private userService : UserService,
               private route : Router,
               private authService : AuthService,
               private customerService: CustomerService,
               private adminService: AdminService,
               private requestService: RequestService) { }
  
    ngOnInit() {
  
      this.activateRoute.paramMap
          .subscribe(params=> {
            this.initialRole=params.get('initialRole');
            console.log(this.initialRole);
      
          });
   this.securityQuestion = ["What is your Favorite movie?","Who is your favorite hero?", "What is your nick name?"];
        this.userForm= new FormGroup({
          "username": new FormControl(this.username, Validators.required),
          "securityQuestion": new FormControl(this.securityQuestion),
          "securityAnswer": new FormControl(this.securityAnswer, [Validators.required]),
          "password": new FormControl('', [Validators.required]),
          "confirmPassword": new FormControl('', [Validators.required])
      });
    }
  validate(userForm) {
    console.log(userForm.value.username);
     
      if(this.initialRole == 'customer'){
        this.doctorService.getOneCustomer(userForm.value.username).subscribe((response)=>{
          this.customerList = response;
          if(userForm.value.username == this.customerList.username && userForm.value.securityAnswer == this.customerList.securityAnswer){
          
             this.customerList.password = userForm.value.confirmPassword;
  
              this.customerService.editCustomer(this.customerList).subscribe((response)=>{
                this.status = response;
                console.log(response);
              })
          }
          else {
            this.invalidStatus = true;
          }
        
        },(responseError) => {
          console.log(responseError.error.message);
        })
      }else if(this.initialRole == 'doctor'){
        
        this.adminService.getAllDoctorsList().subscribe((response)=>{
          this.doctorList = response;
          for(let i=0;i<this.doctorList.length;i++){
            if(this.authService.getUser()==this.doctorList[i].userName){
                 this.doctorId = this.doctorList[i].doctorId;
            }
          }
        

        this.requestService.getOneDoctor(this.doctorId).subscribe((response)=>{
          this.doctorPojo = response;
          if(userForm.value.username == this.doctorPojo.userName && userForm.value.securityAnswer == this.doctorPojo.securityAnswer){
             this.doctorPojo.password = userForm.value.confirmPassword;
             this.customerService.editDoctor(this.customerList).subscribe((response)=>{
               this.status = response;
              console.log(response);
            })
          }
          else {
            this.invalidStatus = true;
          }
        
        },(responseError) => {
          console.log(responseError.error.message);
        })
      })
      }
      
    }
  
    home(){
      this.route.navigate(['']);
    }
    back(){
      this.route.navigate(['login']);
    }
  
    send(userForm){
      console.log(userForm.value);
    }
}
