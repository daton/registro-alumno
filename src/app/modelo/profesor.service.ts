import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Profesor} from './profesor';
import {Estatus} from './estatus';
import { Globales } from './globales';



@Injectable()
export class ProfesorService {
 private direccionUrl=Globales.urlBase+'/profesor';
 //asasasas
  //private direccionUrl= "http://localhost:9000/api/profesor"
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private http:Http) { }

  getProfesor():Observable<Profesor>{
    return this.http.get(this.direccionUrl)
    .map((res:Response)=><Profesor>res.json());

  }
  registrarProfesor(profesor:Profesor):Observable<Estatus>{
    return this.http.post(this.direccionUrl,JSON.stringify(profesor), {headers:this.headers}).
    map((respuesta:Response)=><Estatus>respuesta.json());
  }

}
