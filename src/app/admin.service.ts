import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './site/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient,private authService:AuthService) {}

  getAllDoctorsList():Observable<any>{

    
            let token = 'Bearer '+this.authService.getToken();
            const httpOptions ={
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            };
            
            return this.httpClient.get(environment.medicarebaseUrl+"/doctors", httpOptions);
      }

      getAllCustomersList():Observable<any>{

    
        let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/customers", httpOptions);
  }

    getAllMedicare():Observable<any>{

    
        let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/medicare-services", httpOptions);
  }

  deleteDoctor(userName):Observable<any>{

    
        let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.delete(environment.medicarebaseUrl+"/removeDoctor-signup/"+userName, httpOptions);
  }

   deleteCustomer(username):Observable<any>{

    
        let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.delete(environment.medicarebaseUrl+"/removePatient-signup/"+username, httpOptions);
  }

  getOneMedicare(id){
    let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/oneMedicare/"+id, httpOptions);
  }

  getAllUsers(){
    let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/users", httpOptions);
  }


  getOneUser(id){
    let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/get-one-user/"+id, httpOptions);
  }

  editUser(user){
    let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.put(environment.medicarebaseUrl+"/edit-users",user, httpOptions);

  }
  }

 
