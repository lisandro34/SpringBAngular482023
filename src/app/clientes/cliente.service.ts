import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import {Observable, catchError, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  //obtenemos los datos de los clientes.
  getClientes(): Observable<Cliente[]>{
     //return of (CLIENTES);
  /* manera 1= return this.http.get(this.urlEndPoint).pipe(
    map((response) => response as Cliente[]));*/
    return this.http.get<Cliente[]>(this.urlEndPoint)
   
  }

  //crear un cliente
  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers:this.httpHeaders}).pipe(
      map((response:any)=> response.cliente as Cliente),
      catchError(e =>{
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  //Modificar un cliente editar
  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    )
  }

  //Update,editar
  update(cliente : Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  //delete
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }
}
