import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Claveprofesor} from './claveprofesor';
import {Estatus} from './estatus';
import { Globales } from './globales';


@Injectable()
export class ClaveprofesorService {
  private direccionUrl= Globales.urlBase+"/clave-profesor/"
  // private direccionUrl= "http://localhost:9000/api/clave-profesor/"
  constructor(private http:Http) { }


  getClaveProfesor(miClave:string):Observable<Estatus>{
   return  this.http.get(this.direccionUrl+miClave)
    .map((res:Response)=><Estatus>res.json())
  }

}
