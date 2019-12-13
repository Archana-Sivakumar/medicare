import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private httpClient: HttpClient,private authService: AuthService) {
   }
   addUser(user){
    return this.httpClient.post(environment.signupbaseUrl+"/customer-sign-up",user);
   }
     addAdmin(user){
    return this.httpClient.post(environment.signupbaseUrl+"/admin-sign-up",user);
   }
   addDoctor(user) {
      return this.httpClient.post(environment.signupbaseUrl+"/doctor-sign-up",user);
   }
   addAgent(user) {
    return this.httpClient.post(environment.signupbaseUrl+"/agent-sign-up",user);
 }

 
}
