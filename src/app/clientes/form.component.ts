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
  public titulo: string = "Crear Cliente";
  public cliente: Cliente = new Cliente();

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
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', ` Cliente ${cliente.nombre} creado con exito`, 'success')
      });
  }

  //metodo Update
  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire(`Cliente Actualizado`, `Cliente ${cliente.nombre} actualizado con exito`, 'success');
      }
    )
  }


}
