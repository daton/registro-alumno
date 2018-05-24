import {Materia} from './materia'
import {Pregunta} from './pregunta'
export interface Plantillaexamen {
    id?:string
    materia?:Materia;
    nombre?:string
    introduccion?:string
    preguntas?:Pregunta[]
}
