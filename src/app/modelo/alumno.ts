import {Plantel} from './plantel';
import {Materia} from './materia';
import {Examen} from './examen';
export interface Alumno {
    indice?:number
    nombreCompleto?:string
 clave?:string;
nombre?:string;
 paterno?:string;
 materno?:string;
 celular?:string;
 grupo?:number;
 plantel?:number
 turno?:string;
password?:string;
 email?:string;
 claveProfesor?:String;
 examenes?:Examen[]

    
}
