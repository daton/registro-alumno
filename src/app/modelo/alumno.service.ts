import { Injectable } from '@angular/core';
import {Http, Headers,Response,ResponseContentType, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import {Alumno} from './alumno'
import {Estatus} from './estatus'

import { Globales } from './globales';

@Injectable()
export class AlumnoService {
   private miUrl=Globales.urlBase+"/alumno"
   private headers=new Headers({"Content-Type":"application/json"})
  constructor(private http:Http) { }

  getAlumnos():Observable<Alumno[]>{
  return this.http.get(this.miUrl).map((res:Response)=><Alumno[]>res.json())
  }

  getAlumnoPorId(id:string):Observable<Alumno>{
  return this.http.get(this.miUrl+"/"+id).map((res:Response)=><Alumno>res.json())
  }

  guardarAlumno(alumno:Alumno):Observable<Estatus>{
    return this.http.post(this.miUrl, JSON.stringify(alumno),{headers:this.headers}).map((res:Response)=><Estatus>res.json())
  }

  actualizarAlumno(alumno:Alumno):Observable<Estatus>{
    return this.http.put(this.miUrl,JSON.stringify(alumno),{headers:this.headers}).map((res:Response)=><Estatus>res.json())
  }

  borrarAlumno(id:string):Observable<Estatus>{
    return this.http.delete(this.miUrl+"/"+id).map((res:Response)=><Estatus>res.json())
  }

}
