import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../modelo/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  apiUrl = 'http://localhost:8080/api/empleados'

  constructor(private http: HttpClient) { }

  public listar(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl)
  }

  get(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`)
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado)
  }

  update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
