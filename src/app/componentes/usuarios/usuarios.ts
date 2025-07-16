import { Component } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {
  usuarios: Usuario[] = []
  flag: boolean = false
  usuariosFiltrados: Usuario[] = []
  terminoBusqueda: string = ''
  
  modeloUsuario: Usuario = {
    idusuario: null,
    usuario: '',
    password: '',
    estado: ''
  }

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios()
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data
        this.usuariosFiltrados = [...data];
      },
      error: (error) => console.error('Error al listar usuarios', error)
    })
  }

  obtenerUsuario(id: number): void {
    this.usuarioService.get(id).subscribe({
      next: (data) => {
        this.modeloUsuario = {
          idusuario: data.idusuario,
          usuario: data.usuario,
          password: data.password,
          estado: data.estado
        }
        this.flag = true
      }, error: (error) => console.error('Error al obtener usuario', error)
    })
  }

  crearUsuario(usuario: Usuario): void {
    const usuarioAEnviar = { ...usuario, iusuario: null};
    this.usuarioService.create(usuario).subscribe({
      next: (data) => {
        console.log('Usuario creado', data)
        this.listarUsuarios()
      }, error: (error) => console.error('Error al crear usuario', error)
    })
  }

  actualizarUsuario(id: number, usuario: any): void {
    this.usuarioService.update(id, usuario).subscribe({
      next: (data) => {
        console.log('Usuario actualizado', data)
        this.listarUsuarios()
        this.cancelar()
      }, error: (error) => console.error('Error al actualizar usuario', error)
    })
  }

  eliminarUsuario(id: number): void {
    if(confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          console.log('Usuario eliminado')
          this.listarUsuarios()
        }, error: (error) => console.error('Error al eliminar usuario', error)
      })
    }
  }

  grabarUsuario(usuario: Usuario): void {
    if(this.flag && this.modeloUsuario.idusuario != null) {
      this.actualizarUsuario(this.modeloUsuario.idusuario, usuario);
    } else this.crearUsuario(usuario)
  }
  
  buscarUsuario(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();

    if (!termino) {
      this.usuariosFiltrados = [...this.usuarios];
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(us =>
      (us.idusuario ?? 0).toString().includes(termino) ||
      us.usuario.toLowerCase().includes(termino) ||
      us.password.toLowerCase().includes(termino) ||
      us.estado.toLowerCase().includes(termino)
    );
  }

  cancelar(): void {
    this.modeloUsuario = {
      idusuario: null,
      usuario: '',
      password: '',
      estado: ''
    };
    this.flag = false
  }
}
