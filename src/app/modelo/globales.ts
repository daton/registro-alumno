import { Alumno } from "./alumno";
import { Profesor } from "./profesor";
import { Perfil } from "./perfil";
import { Estatus } from "./estatus";
export class Globales {
  public static alumno: Alumno = {};

  public static alumnos: Alumno[];

  public static profesor: Profesor = {};

public static urlBase:string="https://geradmin.herokuapp.com/api";
 //public static urlBase: string = "http://192.168.100.7:9000/api";
  //TONTOTTTTTTTTTTT

  public static esProfesor: boolean;
  public static esAlumno: boolean;
  public static examenesMateriNombre: string;
  public static examenesNombre: string;

  public static estatus: Estatus;
  public static cargando: boolean;
}
