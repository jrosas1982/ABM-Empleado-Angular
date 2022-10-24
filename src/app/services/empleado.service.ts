import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  listEmpleado:Empleado[] = [
    {nombreCompleto : 'Juan Pablo Rosas', telefono: 1133883964 ,correo : 'jroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Masculino' },
    {nombreCompleto : 'Eva Rosas', telefono: 1109834564 ,correo : 'eroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Femenino' },
    { nombreCompleto: 'Pablo Mendez', telefono: 11338835345, correo: 'jroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Masculino' },
    { nombreCompleto: 'Florencia Rosas', telefono: 1136583645, correo: 'froas1982@gmail.com', fechaIngreso: new Date(), estadoCivil: 'soltero', sexo: 'Femenino' },
    {nombreCompleto : 'Federico Duodeno', telefono: 11338864564 ,correo : 'jroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Masculino' },
    { nombreCompleto: 'Daniela Rosas', telefono: 1423483964, correo: 'droas1982@gmail.com', fechaIngreso: new Date(), estadoCivil: 'soltero', sexo: 'Femenino' },
    {nombreCompleto : 'Gaspar Cimiento', telefono: 42423883964 ,correo : 'jroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Masculino' },
    { nombreCompleto: 'Maria Rosas', telefono: 23423423964, correo: 'mroas1982@gmail.com', fechaIngreso: new Date(), estadoCivil: 'soltero', sexo: 'Femenino' },
    {nombreCompleto : 'Ricardo Rivero', telefono: 14244883964 ,correo : 'jroas1982@gmail.com', fechaIngreso: new Date() , estadoCivil: 'soltero', sexo: 'Masculino' },
  
  ];

  constructor() { }

  getEmpleados(){
    return this.listEmpleado.slice();
  }
  eliminarEmpleado(index : number){
    this.listEmpleado.splice(index,1);
  }
  almacenarEmpleado(empleado: Empleado) {
    this.listEmpleado.unshift(empleado);
  }
  getEditEmpleado(index: number) {
  return this.listEmpleado[index];
  }
  EditEmpleado(empleado:Empleado,idEmpleado: number) {
    this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[idEmpleado].correo = empleado.correo;
    this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleado[idEmpleado].sexo = empleado.sexo;
  }
}
