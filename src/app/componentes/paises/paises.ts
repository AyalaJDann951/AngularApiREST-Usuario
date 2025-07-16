import { Component } from '@angular/core';
import { Pais } from '../../modelo/pais';
import { PaisService } from '../../servicios/pais-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paises',
  imports: [FormsModule, CommonModule],
  templateUrl: './paises.html',
  styleUrl: './paises.css'
})
export class Paises {
  paises: Pais[] = []
  flag: boolean = false
  paisesFiltrados: Pais[] = []
  terminoBusqueda: string = ''

  modeloPais: Pais = {
    idpais: null,
    pais: ''
  }
  
  constructor(private paisService: PaisService) { }
  
  ngOnInit(): void {
    this.listarPaises()
  }
  
  listarPaises(): void {
    this.paisService.listar().subscribe({
      next: (data) => {
        this.paises = data
        this.paisesFiltrados = [...data];
      },
      error: (error) => console.error('Error al listar países', error)
    })
  }
  
  obtenerPais(id: number): void {
    this.paisService.get(id).subscribe({
      next: (data) => {
        this.modeloPais = {
          idpais: data.idpais,
          pais: data.pais
        }
        this.flag = true
      }, error: (error) => console.error('Error al obtener país', error)
    })
  }
  
  crearPais(pais: Pais): void {
    const paisAEnviar = { ...pais, idpais: null};
    this.paisService.create(pais).subscribe({
      next: (data) => {
        console.log('País creado', data)
        this.listarPaises()
      }, error: (error) => console.error('Error al crear país', error)
    })
  }
  
  actualizarPais(id: number, pais: any): void {
    this.paisService.update(id, pais).subscribe({
      next: (data) => {
        console.log('País actualizado', data)
        this.listarPaises()
        this.cancelar()
      }, error: (error) => console.error('Error al actualizar país', error)
    })
  }
  
  eliminarPais(id: number): void {
    if(confirm('¿Está seguro de eliminar este país?')) {
      this.paisService.delete(id).subscribe({
        next: () => {
          console.log('País eliminado')
          this.listarPaises()
        }, error: (error) => console.error('Error al eliminar país', error)
      })
    }
  }
  
  grabarPais(pais: Pais): void {
    if(this.flag && this.modeloPais.idpais != null) {
      this.actualizarPais(this.modeloPais.idpais, pais);
    } else this.crearPais(pais)
  }

  buscarPais(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();

    if (!termino) {
      this.paisesFiltrados = [...this.paises];
      return;
    }

    this.paisesFiltrados = this.paises.filter(p =>
      (p.idpais ?? 0).toString().includes(termino) ||
      p.pais.toLowerCase().includes(termino)
    );
  }
  
  cancelar(): void {
    this.modeloPais = {
      idpais: null,
      pais: ''
    };
    this.flag = false
  }
}
