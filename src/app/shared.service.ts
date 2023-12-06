import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(private http:HttpClient) { };

  baseUrl : string = 'https://db.ezobooks.in/kappa/image/';
  httpHeaders :HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  getDataFromServer(endPoint:string){
    let url = this.baseUrl + endPoint;
    return this.http.get(url,{headers:this.httpHeaders})
  };
}
