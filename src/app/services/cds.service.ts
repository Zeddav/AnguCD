import { Injectable } from '@angular/core';
import { CD } from '../models/cd.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CdsService {

  constructor(private http: HttpClient) { }

  getCDs(): Observable<CD[]>{
   return this.http.get<CD[]>('http://localhost:3001/CD')
  }


  getCDById(id: number) : Observable<CD>{
    return this.http.get<CD>('http://localhost:3001/CD/'+id)
  }
}
