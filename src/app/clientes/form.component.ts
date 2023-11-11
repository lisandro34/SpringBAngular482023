import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  titulo: string = "Crear Cliente";
  cliente: Cliente = new Cliente();
  errores : string[];

  constructor(private clienteService: ClienteService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
  }

  //metodo para editar
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })

  }

  //metodo para crear un nuevo registro de clientes en la base de datos
  create(): void {
    //console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe({
      next: cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito`, 'success')
      },
      //manejo de errores del backend
      error: err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend:' + err.status);
        console.error(err.error.errors);
      }

    });
  }
  //metodo Update
  update(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: json => {
        this.router.navigate(['/clientes'])
        Swal.fire(`Cliente Actualizado`, `${json.mensaje}: ${json.cliente.nombre}`, 'success');
      },
      //manejo de error del backend
      error: err=>{
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
  })
  }


}
