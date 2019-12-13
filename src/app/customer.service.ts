import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './site/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

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
  bookAppointment(appointment){

    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.post(environment.medicarebaseUrl+"/bookAppointment",appointment,httpOptions);
  }

  getTestResult(requestId){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.get(environment.medicarebaseUrl+"/get-test-result/"+requestId,httpOptions);
  }


  editCustomer(customer){
    let token = 'Bearer '+this.authService.getToken();
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    
    return this.httpClient.put(environment.signupbaseUrl+"/customer-update",customer, httpOptions);
  }

  
  editDoctor(doctor){
    let token = 'Bearer '+this.authService.getToken();
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    
    return this.httpClient.put(environment.signupbaseUrl+"/doctor-update",doctor, httpOptions);
  }
  
}
