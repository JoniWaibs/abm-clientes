import { Component, OnInit } from '@angular/core';
//servicios
import { EmpleadoService } from '../../Services/empleado.service'
//injectar el modulo toast
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleadoss',
  templateUrl: './lista-empleadoss.component.html',
  styleUrls: ['./lista-empleadoss.component.css']
})
export class ListaEmpleadossComponent implements OnInit {
  //array de clietnes
  clientes: any[] =[]

  
  constructor( private EmpleadoService: EmpleadoService , private toastr: ToastrService){ 
    
  }

  ngOnInit(): void {
    //inicializo el metodo de obtener clietnes
    this.obtenerClientes()
  }
  //obtiene los clietnes del servicio
  obtenerClientes(){

    this.EmpleadoService.obtenerClientes().subscribe( data => {
      this.clientes = []
        data.forEach((element:any) => {
            this.clientes.push({
              id:element.payload.doc.id,
              ...element.payload.doc.data()
            });
        });
        console.log(this.clientes)
    });
  
  }

  //elimina elementos desde el servicio
  elimiarClienteDOM(id: string){
    this.EmpleadoService.eliminarCliente(id).then( () =>{

      this.toastr.error('Has borrado cliente correctamente!', 'CLIENTE ELIMINADO' , {
        positionClass: 	'toast-bottom-right'
      });


    });
  };
 
}
