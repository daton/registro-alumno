import {Materia} from './materia';
export interface Examen {
    materia?:Materia
    nombre?:string
    calificacion?:number;
    realizado?:boolean
}
