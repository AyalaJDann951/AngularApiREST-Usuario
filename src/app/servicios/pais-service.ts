import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../modelo/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  apiUrl = 'http://localhost:8080/api/paises'
  
  constructor(private http: HttpClient) { }

  public listar(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
  
  get(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }
  
  create(empleado: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, empleado)
  }
  
  update(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empleado)
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
