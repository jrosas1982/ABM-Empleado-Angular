import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  listEmpleado: Empleado[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'correo', 'fechaIngreso' , 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  @ViewChild(MatPaginator, { static: true })
  pag!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(private _empleadoService: EmpleadoService, public dialog: MatDialog, public snackBar : MatSnackBar) {


   }


  ngOnInit(): void {
    this.cargarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados(){
    this.listEmpleado = this._empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleado);
    this.dataSource.paginator = this.pag;
    this.dataSource.sort = this.sort;
  }
  eliminarEmpleado(index : number){
      const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
        width: '350px',
        data: { Mensaje: "Esta seguro que desea eliminar?" },
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'Aceptar'){
          this._empleadoService.eliminarEmpleado(index);
          this.cargarEmpleados();
          this.snackBar.open('Empleado eliminado con exito','',{duration: 3000} );
        }
      });
    }
}


