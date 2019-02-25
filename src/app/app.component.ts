import { Component, ViewChild, OnInit } from "@angular/core";
import { ClrWizard, Wizard } from "@clr/angular";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Globales } from "./modelo/globales";
import { Materia } from "./modelo/materia";
import { ProfesorService } from "./modelo/profesor.service";
import { Profesor } from "./modelo/profesor";

import { Sistema } from "./modelo/sistema";
import { ClaveprofesorService } from "./modelo/claveprofesor.service";
import { ClaveService } from "./modelo/clave.service";
import { ClaveprofesoralumnoService } from "./modelo/claveprofesoralumno.service";
import { Alumno } from "./modelo/alumno";
import { Plantel } from "./modelo/plantel";
import { Estatus } from "./modelo/estatus";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ClaveService, ClaveprofesoralumnoService, ProfesorService]
})
export class AppComponent {
  @ViewChild("wizardlg")
  wizardLarge: Wizard;

  @ViewChild("myForm")
  formData: any;

  //Este es "myFormContrasena" para las validaciones de la autenticacion
  @ViewChild("myFormContrasena")
  formDataContrasena: any;
  @ViewChild("myFormContrasena")
  formDataContrasena2: any;

  @ViewChild("myFormEmail")
  formDataEmail: any;

  @ViewChild("myFormGrupoPlantelTurno")
  formDataGrupo: any;
  @ViewChild("myFormGrupoPlantelTurno")
  formDataPlantel: any;
  @ViewChild("myFormGrupoPlantelTurno")
  formDataTurno: any;

  modelo: Alumno;

  miNIP: string;
  loadingFlag: boolean = false;
  errorFlag: boolean = false;
  miCorreo: string;
  miPassword: string;

  miPassword2: string;

  miGrupo: number;
  miPlantelsillo: number;
  miTurno: string;

  disabled: boolean;

  cargandoFlagContrasena = false;
  cargandoFlagEmail = false;
  cargandoFlagClave = false;
  cargandoFlagGrupoPlantelTurno = false;

  errorFlagContrasena = false;
  errorFlagEmail = false;
  errorFlagClave = false;
  errorFlagGrupoPlantelTurno = false;

  mensajeErrorContrasena: string;
  mensajeErrorEmail: string = "Correo no válido";
  mensajeErrorClave: string = "Clave incorrecta";
  mensajeErrorGrupoPlantelTurno: string;

  lgOpen: boolean = true;

  perfil: string = "Alumno";

  //ESTA ES LA CLAVE DEL LIBRO DEL ALUMNO QUE SE RELACIONARA A LA MATERIA, YA QUE LA COLECCION CLAVE
  //CONTIENE LA MATERIA ASOCIADA A DICHO LIBRO
  miClaveLibro: string;
  noEsProfesor: boolean = true;
  public estatus: Estatus;
  public estatusProfesor: Estatus;
  oculta: boolean = true;

  nombreProfesor: string;
  turno: string;
  miPlantel: string;
  sistema: Plantel = {
    numero: null
  };

  modeloProfesor: Profesor = {
    nombre: "",
    clave: "",
    celular: "",
    paterno: "",
    password: "",
    registrado: "",
    email: "",
    materno: "",
    materias: [],
    turno: "",
    sistema: this.sistema
  };

  planteles: Plantel[];

  // have to define doCancel because page will prevent doCancel from working
  // if the page had a previous button, you would need to call
  // this.wizard.previous() manually as well...
  doCancel(): void {
    this.wizardLarge.close();
  }

  onCommit(): void {
    let value: any = this.formData.value;
    this.loadingFlag = true;
    this.errorFlag = false;
    value.miClaveLibro;

    //sacamos la clave del libro
    this.modelo.clave = value.miClaveLibro;
    console.log(
      "Ante de enviar la clave de este libro es  es: " + this.modelo.clave
    );

    this.http
      .get<Estatus>(Globales.urlBase + "/clave/" + this.modelo.clave)
      .subscribe(datos => {
        this.estatus = datos;
      });

    setTimeout(() => {
      if (this.estatus.success) {
        this.wizardLarge.forceNext();
        this.modelo.clave = this.miClaveLibro;
        console.log("Encontrado!! y se asignaraa" + this.modelo.clave);
      } else {
        this.errorFlag = true;
        console.log("La clave que no se acepto es " + this.modelo.clave);
      }
      this.loadingFlag = false;
    }, 2200);
  }

  constructor(
    private servicioClave: ClaveService,
    private http: HttpClient,
    private servicioClaveProfesor: ClaveprofesoralumnoService
  ) {
    this.oculta = true;
    this.planteles = [
      { numero: 1 },
      { numero: 2 },
      { numero: 3 },
      { numero: 4 },
      { numero: 5 },
      { numero: 6 },
      { numero: 7 },
      { numero: 8 },
      { numero: 9 },
      { numero: 10 },
      { numero: 11 },
      { numero: 12 },
      { numero: 13 },
      { numero: 7 },
      { numero: 14 },
      { numero: 14 },
      { numero: 16 },
      { numero: 17 },
      { numero: 18 },
      { numero: 19 },
      { numero: 20 }
    ];
  }

  ngOnInit() {
    this.estatus = {
      success: false
    };

    this.estatusProfesor = {
      success: false
    };

    //modelo alumno
    this.modelo = {};
  }

  obtenerClave() {
    console.log("LA CLAVE QUE VE EL FORMILARIO ES " + this.miClaveLibro);
    this.getClave();
    console.log("CLAVE DEL LIBRO DEL ALUMNO " + this.estatus.success);
    this.estatus.mensaje = "";
  }

  // CLAVE DEL LIBRO EXTRAIDA DEL SERVICIO CLAVE
  getClave() {
    this.servicioClave
      .getClave(this.miClaveLibro)
      .subscribe(estatus => (this.estatus = estatus));
  }
  navegarInicioYregistrar() {
    // 15-marzo-2018. Del modelo ajustamos los valores desde el formulario no hagas caso jeje

    //this.router.navigate(["/inicio"], { skipLocationChange: true });



    window.location.href = "https://daton.github.io/academia-geer/#/login";
  }

  soloRegistrar() {
    this.http
      .post<Estatus>(Globales.urlBase + "/alumno", this.modelo, {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      })
      .subscribe(datos => {
        this.estatus = datos;
      });

    setTimeout(() => {
      console.log(this.estatus.mensaje);
    }, 1600);
  }
  verPerfil() {
    console.log("hola");
    if (this.perfil === "Profesor") {
      console.log("Eres profesor");
      this.noEsProfesor = false;
    } else {
      console.log("No eres profesor");
      this.noEsProfesor = true;
    }
  }

  hacerAlgo() {
    console.log("asasasas");
    // this.=this.estatus.success;
  }
  estaInvalidada(): boolean {
    this.oculta = this.estatus.success;
    return !this.estatus.success;
  }
  recupararContrasena() {
    console.log("Contraseña recuperada");
  }

  onCommitEmail(): void {
    let value: any = this.formDataEmail.value;
    this.cargandoFlagEmail = true;
    this.errorFlagEmail = false;
    value.miEmail;

    this.cargandoFlagEmail = true;
    this.errorFlagEmail = false;

    this.obtenerClaveProfesor();

    setTimeout(() => {
      if (
        this.miCorreo.indexOf("@") !== -1 &&
        this.miPassword == this.miPassword2 &&
        this.estatusProfesor.success
      ) {
        this.wizardLarge.forceNext();
        console.log("Tiene formato de email");
        this.modelo.email = this.miCorreo;
        this.modelo.password = this.miPassword;
        this.modelo.claveProfesor = this.modeloProfesor.clave;
      } else if (this.miCorreo.indexOf("@") == -1) {
        console.log("No tiene formato de email");
        this.errorFlagEmail = true;

        this.mensajeErrorEmail = "Este correo no es válido";
      } else if (this.miPassword != this.miPassword2) {
        this.errorFlagContrasena = true;
        this.mensajeErrorContrasena = "Las contraseñas no coinciden";
      } else if (!this.estatusProfesor.success) {
        this.errorFlagClave = true;
        this.mensajeErrorClave = "Esa clave de profesor no existe";
      }
      this.cargandoFlagEmail = false;
      this.cargandoFlagContrasena = false;
      this.cargandoFlagClave = false;

      console.log(
        "Aqui enviaremos para que aparezca el emaiul y la clave del alumno...."
      );
      let estatusito: Estatus;
      this.http
        .post<Estatus>(Globales.urlBase + "/validar-correo", this.modelo)
        .subscribe(datos => {
          estatusito = datos;
        });
    }, 1000);
  }

  onCommitContrasena(): void {
    let value: any = this.formDataContrasena.value;
    let value2: any = this.formDataContrasena2.value;
    this.cargandoFlagContrasena = true;
    this.errorFlagContrasena = false;

    // aqui value lo enlazamos a una variable del formulario a validar asincronimcamente
    value.miPassword;
    value2.miPassword2;
    console.log("PUaaaaaaaaaa");

    //Hacemos el envio asincronico con la informacion anterior

    setTimeout(() => {
      if (this.miPassword == this.miPassword2) {
        this.wizardLarge.forceNext();
        console.log("Contraseña aceptada!");
      } else {
        this.errorFlagContrasena = true;
        this.mensajeErrorContrasena = "Las contraseñas no coinciden";
        console.log(
          "error de correo!!" + this.miPassword + " el otro " + this.miPassword2
        );
      }
      this.cargandoFlagContrasena = false;
      //Esta es la ultima parte antes de checar los datos
    }, 1500);
  }

  onCommitGrupoPlantelTurno(): void {
    let value1: any = this.formDataGrupo.value;
    let value2: any = this.formDataPlantel.value;
    let value3: any = this.formDataTurno.value;
    this.cargandoFlagGrupoPlantelTurno = true;
    this.errorFlagGrupoPlantelTurno = false;

    //Enlazamos a loa tributos nuevos del alumno
    value1.miGrupo;
    value2.miPlantel;
    value3.miTurno;

    let valor = this.checarNIP();

    setTimeout(() => {
      if (
        this.miGrupo != null &&
        this.miPlantelsillo != null &&
        this.miTurno != null &&
        this.miNIP != null &&
        valor != null
      ) {
        this.modelo.grupo = this.miGrupo;
        this.modelo.plantel = this.miPlantelsillo;
        this.modelo.turno = this.miTurno;
        console.log(
          this.modelo.grupo +
            " " +
            this.modelo.turno +
            " " +
            this.modelo.plantel
        );

        console.log("Ya fue validados lo campos");
        this.errorFlagGrupoPlantelTurno = false;
        this.wizardLarge.forceNext();
      } else {
        this.errorFlagGrupoPlantelTurno = true;
        this.mensajeErrorGrupoPlantelTurno = "NIP incorrecto";
        // else this.mensajeErrorGrupoPlantelTurno =
        "Debes seleccionar todos los campos";
        console.log("El NIP ingresado es incorrecto " + this.miNIP);
        console.log("Que la chingamos " + this.errorFlagGrupoPlantelTurno);
        this.cargandoFlagGrupoPlantelTurno = false;
      }
    }, 1400);
    this.cargandoFlagGrupoPlantelTurno = false;
  }

  checarNIP() {
    let miEstatusNip: Estatus;
    console.log(
      "LA CLAVE DE SSALIDA ES " +
        this.modelo.clave +
        " y el nip es " +
        this.miNIP
    );
    this.http
      .get<Estatus>(
        Globales.urlBase +
          "/obtener-nip/" +
          this.modelo.clave +
          "/" +
          this.miNIP
      )
      .subscribe(respuesta => {
        miEstatusNip = respuesta;
      });

    setTimeout(() => {
      console.log(
        "Vamos a ver cual nos refresa el servidor con esa clave" +
          miEstatusNip.success
      );
      if (!miEstatusNip.success) {
        //this.mensajeErrorGrupoPlantelTurno ="NIP incorrecto"
        this.errorFlagGrupoPlantelTurno = true;
        return false;
      } else {
        //Aqui se guardan los valores de los campos una vez que se checa el nip correcto
        //este es importantisimo.
        this.errorFlagGrupoPlantelTurno = false;
        this.modelo.grupo = this.miGrupo;
        this.modelo.plantel = this.miPlantelsillo;
        this.modelo.turno = this.miTurno;

        this.wizardLarge.forceNext();
        return true;
      }
    }, 1000);
  }

  doCancelContrasena(): void {
    this.wizardLarge.close();
    window.location.href = "https://daton.github.io/academia-geer/#/login";
  }
  regresar(): void {
    this.wizardLarge.previous();
  }

  navegarInicio() {
    // this.router.navigate(["/inicio"], { skipLocationChange: true });
    window.location.href = "https://daton.github.io/academia-geer/#/login";
  }

  obtenerClaveProfesor() {
    this.getClaveProfesor();

    console.log(
      "Estatus " +
        this.estatusProfesor.success +
        "Mensaje " +
        this.estatusProfesor.mensaje
    );
  }
  getClaveProfesor() {
    this.servicioClaveProfesor
      .getClaveProfesor(this.modeloProfesor.clave)
      .subscribe(estatus => (this.estatusProfesor = estatus));
  }
}
