import { Sistema } from "./sistema";
import { Materia } from "./materia";

export interface Profesor {
  clave?: string;
  nombre?: string;
  paterno?: string;
  materno?: string;
  celular?: string;
  turno?: string;
  password?: string;
  email?: string;

  registrado?: string;
  materias?: Materia[];
  sistema?: Sistema;
}
