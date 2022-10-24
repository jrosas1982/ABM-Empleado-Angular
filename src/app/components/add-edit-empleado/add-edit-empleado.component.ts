import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private fb :FormBuilder , private _empleadoService : EmpleadoService , private route : Router,
    public snackBar: MatSnackBar) {
    this.forms = this.fb.group({
      nombreCompleto: ['', Validators.required , Validators.maxLength(20)],
      correo: '',
      fechaIngreso: '',
      telefono: '',
      estadoCivil:'',
      sexo:''
    });
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
    this._empleadoService.almacenarEmpleado(empleado);
    this.snackBar.open('Empleado Agregado con exito', '', { duration: 3000 });
    this.route.navigate(['/']);

  }
  ngOnInit(): void {
  }
}
