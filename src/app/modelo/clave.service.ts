import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Clave} from './clave';
import {Estatus} from './estatus';
import { Globales } from './globales';

@Injectable()
export class ClaveService {
 //private direccionUrl= "http://geradmin.herokuapp.com/api/clave/"
 private direccionUrl= Globales.urlBase+"/clave/"
  constructor(private http:Http) { }


  getClave(miClave:number):Observable<Estatus>{
   return  this.http.get(this.direccionUrl+miClave)
    .map((res:Response)=><Estatus>res.json())
  }
}
