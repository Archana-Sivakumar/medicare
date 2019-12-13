import { Injectable } from '@angular/core';
import { AuthService } from './site/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private authService: AuthService,
    private httpClient: HttpClient,) { }


	addRequest(request){
            let token = 'Bearer '+this.authService.getToken();
            const httpOptions ={
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            };
            console.log(request);
            return this.httpClient.post(environment.medicarebaseUrl+"/request",request, httpOptions);
  }

       adminViewRequest(){
            let token = 'Bearer '+this.authService.getToken();
            const httpOptions ={
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            };
            
            return this.httpClient.get(environment.medicarebaseUrl+"/adminViewRequest", httpOptions);
      }

      customerViewRequest(customerId){
        let token = 'Bearer '+this.authService.getToken();
        const httpOptions ={
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        
        return this.httpClient.get(environment.medicarebaseUrl+"/customerViewRequest/"+customerId, httpOptions);
  }
  
  doctorViewRequest(){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.get(environment.medicarebaseUrl+"/doctorViewRequest",httpOptions);

  }

  getOneRequest(id){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.get(environment.medicarebaseUrl+"/oneRequest/"+id,httpOptions);

  }

  getOneDoctor(doctorId){
    let token = 'Bearer ' + this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.httpClient.get(environment.medicarebaseUrl+"/getOneDoctor/"+doctorId,httpOptions);

  }


  acceptRequest(request){
    let token = 'Bearer '+this.authService.getToken();
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    
    return this.httpClient.put(environment.medicarebaseUrl+"/requestUpdate",request, httpOptions);
}

  rejectRequest(request){
    let token = 'Bearer '+this.authService.getToken();
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    
    return this.httpClient.put(environment.medicarebaseUrl+"/requestUpdate",request, httpOptions);
  }
}
