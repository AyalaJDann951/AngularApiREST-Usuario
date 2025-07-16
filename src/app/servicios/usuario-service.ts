import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) { }

  public listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
  }
  
  get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`)
  }
  
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario)
  }
  
  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario)
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  login(usuario: string, password: string) {
    return this.http.post<Usuario>('http://localhost:8080/api/usuarios/login', {
      usuario,
      password
    });
  }
}
