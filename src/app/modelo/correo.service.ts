import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CorreoService {
  private direccionUrl='http://www.geducativoedi.com.mx/correo.php';
  constructor(private http:Http) { }

  getCorreo():Observable<string>{
    return this.http.get(this.direccionUrl)
    .map((res:Response)=><string>res.statusText);

  }
}
