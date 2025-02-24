import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../common/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = "http://localhost:8082/api/customer/register";

  // private apiUrl = "http://localhost:3333/api/customer/register";

  constructor(private httpClient: HttpClient) { }

  register(Register: Register):Observable<string>{
    console.log("Inside email check"+Register.email+" "+Register.name+" "+Register.phoneNo+" "+Register.password);
    return this.httpClient.post(this.apiUrl,Register,{responseType:'text'});
  }
}