import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../site/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 username: string;
 password: string;
 show: boolean = false;
 initialRole:string;
 validationStatus: boolean = false;
 status :any = false;
 authenticationStatus : any = false;

  constructor(  private activateRoute: ActivatedRoute,
                private authService: AuthService,
                 private route: Router, private adminService:AdminService
                 ) { }

  ngOnInit() {

    this.activateRoute.paramMap
        .subscribe(params=> {
          this.status=params.get('status');
    this.initialRole = this.authService.getInitialRole();

    this.loginForm= new FormGroup({
        "username": new FormControl(this.username, Validators.required),
         "password": new FormControl(this.password, Validators.required)
    });

  })
  }

  send(loginForm) {

    this.authService.authenticate(loginForm.value.username, loginForm.value.password)
       .subscribe((response) => {
              this.validationStatus = false;
              this.authService.setToken(response.token);
              
              this.authService.setRole(response.role);
              this.authService.setUser(response.user);
             if(response.role == 'ADMIN'){
              this.route.navigate(['admin']);
             }
             if(response.role == 'PATIENT'){
              this.route.navigate(['customer']);
             }
             if(response.role == 'DOCTOR'){
              this.route.navigate(['doctor']);
             }       
      },
      (responseError) => {
        console.log(responseError.error.message);

        if(responseError.error.message === 'PENDING') {
          this.authenticationStatus = "PENDING";
        }else if(responseError.error.message === 'REJECTED'){
          this.authenticationStatus = "REJECTED";
        }else{
          this.validationStatus = true;
        }
      });
      
   
  }

  passwordFunction() {
    this.show = !this.show;
  }

  back(){
    this.route.navigate(['']);
  }

  signIn(){
    let role = this.authService.getInitialRole();
    if(role == 'admin'){
      this.route.navigate(['signup-admin']);
    }else if(role == 'customer'){
      this.route.navigate(['signup-customer']);
    }else if(role == 'doctor'){
      this.route.navigate(['signup-doctor']);
    }else{
      this.route.navigate(['signup-agent']);
    }
    
  }


}
