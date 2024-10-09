import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private backendApiUrl = 'http://localhost:8000/api';

  httpOptions = new HttpHeaders({
    'content-type': 'application/json'
  })
  constructor(private httpClient:HttpClient) { }

  getCities(){
    return this.httpClient.get(this.backendApiUrl+'/getCities');    
  }

  fetchData(){
    return this.httpClient.get(this.backendApiUrl+'/users');
  }

  storeUser(data:any){
    return this.httpClient.post(this.backendApiUrl+'/storeUser',JSON.stringify(data), {
      headers: this.httpOptions
    });
  }
}
