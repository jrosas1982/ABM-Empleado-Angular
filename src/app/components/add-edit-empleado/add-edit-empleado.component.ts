import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadoCiviles : any[] = ['Soltero', 'Casado' , 'Divorsiado'];
  forms : FormGroup;
  accion = 'Crear';
  idEmpleado:any;
  constructor(private fb :FormBuilder , private _empleadoService : EmpleadoService , private route : Router,
    public snackBar: MatSnackBar , private aRoute : ActivatedRoute) {
    this.forms = this.fb.group({
      nombreCompleto: ['', [Validators.required , Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam]
   }

  guardarEmpleado(){
    const empleado : Empleado ={
      nombreCompleto : this.forms.get('nombreCompleto')?.value,
      correo : this.forms.get('correo')?.value,
      fechaIngreso : this.forms.get('fechaIngreso')?.value,
      telefono : this.forms.get('telefono')?.value,
      estadoCivil : this.forms.get('estadoCivil')?.value,
      sexo : this.forms.get('sexo')?.value
    }
    if(this.idEmpleado !==undefined)
    {
      this.editarEmpleado(empleado);

    }else 
    {
      this.agregarEmpleado(empleado);
    }  
  }
  agregarEmpleado(empleado :Empleado){
    if (this.forms.valid) {
      this._empleadoService.almacenarEmpleado(empleado);
      this.snackBar.open('Empleado Agregado con exito', '', { duration: 3000 });
      this.route.navigate(['/']);
    }
  }
  editarEmpleado(empleado: Empleado){
    this._empleadoService.EditEmpleado(empleado,this.idEmpleado);
    this.snackBar.open('Empleado Agregado con exito', '', { duration: 3000 });
    this.route.navigate(['/']);
  }

  esEditEmpleado() {
   const empleado : Empleado =  this._empleadoService.getEditEmpleado(this.idEmpleado);

   this.forms.patchValue({
    
    nombreCompleto: empleado.nombreCompleto,
    correo: empleado.correo,
    fechaIngreso: empleado.fechaIngreso,
    telefono: empleado.telefono,
    estadoCivil : empleado.estadoCivil,
    sexo: empleado.sexo

   });

  }

  ngOnInit(): void {
    if(this.idEmpleado !== undefined)
    {
      this.accion = 'Editar';
      this.esEditEmpleado();
    }
  }
}
