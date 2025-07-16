import { Component } from '@angular/core';
import { EmpleadoService } from '../../servicios/empleado-service';
import { Empleado } from '../../modelo/empleado';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class Empleados {
  empleados: Empleado[] = []
  flag: boolean = false
  empleadosFiltrados: Empleado[] = []
  terminoBusqueda: string = ''

  modeloEmpleado: Empleado = {
    idempleado: null,
    nombre: '',
    paterno: '',
    materno: '',
    cargo: ''
  }

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.listarEmpleados()
  }

  listarEmpleados(): void {
    this.empleadoService.listar().subscribe({
      next: (data) => {
        this.empleados = data
        this.empleadosFiltrados = [...data];
      },
      error: (error) => console.error('Error al listar empleados', error)
    })
  }

  obtenerEmpleado(id: number): void {
    this.empleadoService.get(id).subscribe({
      next: (data) => {
        this.modeloEmpleado = {
          idempleado: data.idempleado,
          nombre: data.nombre,
          paterno: data.paterno,
          materno: data.materno,
          cargo: data.cargo
        }
        this.flag = true
      }, error: (error) => console.error('Error al obtener empleado', error)
    })
  }

  crearEmpleado(empleado: Empleado): void {
    const empleadoAEnviar = { ...empleado, idempleado: null};
    this.empleadoService.create(empleado).subscribe({
      next: (data) => {
        console.log('Empleado creado', data)
        this.listarEmpleados()
      }, error: (error) => console.error('Error al crear empleado', error)
    })
  }

  actualizarEmpleado(id: number, empleado: any): void {
    this.empleadoService.update(id, empleado).subscribe({
      next: (data) => {
        console.log('Empleado actualizado', data)
        this.listarEmpleados()
        this.cancelar()
      }, error: (error) => console.error('Error al actualizar empleado', error)
    })
  }

  eliminarEmpleado(id: number): void {
    if(confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoService.delete(id).subscribe({
        next: () => {
          console.log('Empleado eliminado')
          this.listarEmpleados()
        }, error: (error) => console.error('Error al eliminar empleado', error)
      })
    }
  }

  grabarEmpleado(empleado: Empleado): void {
    if(this.flag && this.modeloEmpleado.idempleado != null) {
      this.actualizarEmpleado(this.modeloEmpleado.idempleado, empleado);
    } else this.crearEmpleado(empleado)
  }
  
  buscarEmpleado(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();

    if (!termino) {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }

    this.empleadosFiltrados = this.empleados.filter(emp =>
      (emp.idempleado ?? 0).toString().includes(termino) ||
      emp.nombre.toLowerCase().includes(termino) ||
      emp.paterno.toLowerCase().includes(termino) ||
      emp.materno.toLowerCase().includes(termino) ||
      emp.cargo.toLowerCase().includes(termino)
    );
  }

  cancelar(): void {
    this.modeloEmpleado = {
      idempleado: null,
      nombre: '',
      paterno: '',
      materno: '',
      cargo: ''
    };
    this.flag = false
  }
}
