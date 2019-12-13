import { Injectable } from '@angular/core';
import { AuthService } from './site/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private authService: AuthService,
              private httpClient: HttpClient,) { }

  addMedicareService(id){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    let user = this.authService.getUser();
    return this.httpClient.post(environment.medicarebaseUrl+"/" + user + "/" + id,httpOptions);
  }


  editMedicareService(medicareServiceForm){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.post(environment.medicarebaseUrl+"/editMedicareService",medicareServiceForm,httpOptions);
  }

  updateTestResult(testResultForm){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.post(environment.medicarebaseUrl+"/updateTestResult",testResultForm,httpOptions);
  }

  getOneCustomer(customerName){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.get(environment.medicarebaseUrl+"/getOneCustomer/"+customerName,httpOptions);
  }


}
