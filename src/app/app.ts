import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './modelo/usuario';
import { UsuarioService } from './servicios/usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tienda';

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
    const usuarioGuardado = localStorage.getItem('usuarioLogeado');
    if(usuarioGuardado) {
      this.flag = true;
      this.modeloUsuario = JSON.parse(usuarioGuardado);
    }
  }

  loginUsuario(): void {
    const { usuario, password } = this.modeloUsuario;

    if (!usuario || !password) {
      alert('Debe ingresar usuario y contraseña')
      return
    }

    this.usuarioService.login(usuario, password).subscribe({
      next: (usuarioLogeado) => {
        alert(`Bienvenido ${usuarioLogeado.usuario}`)
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioLogeado));
        this.flag = true
        //this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        console.error('Error en login', error)
        alert('Usuario o contraseña incorrectos')
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogeado');
    this.flag = false;
    this.modeloUsuario = { idusuario: null, usuario: '', password: '', estado: '' };
  }
}
