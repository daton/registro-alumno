import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Claveprofesor} from './claveprofesor';
import {Estatus} from './estatus';
import { Globales } from './globales';


@Injectable()
export class ClaveprofesoralumnoService {
 // private direccionUrl= "http://geradmin.herokuapp.com/api/clave-profesor-alumno/"
   private direccionUrl= Globales.urlBase+"/clave-profesor-alumno/"
  constructor(private http:Http) { }


  getClaveProfesor(miClave:string):Observable<Estatus>{
   return  this.http.get(this.direccionUrl+miClave)
    .map((res:Response)=><Estatus>res.json())
  }

}
