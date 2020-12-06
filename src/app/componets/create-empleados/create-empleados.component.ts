import { Component, OnInit } from '@angular/core';
//importar form group
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
//injectar el servicio que conecta con firebase
import { EmpleadoService } from '../../Services/empleado.service'
import { Router, ActivatedRoute } from '@angular/router'
//injectar el modulo toast
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})

export class CreateEmpleadosComponent implements OnInit {
  //crear el grupo de campos del form
  createCliente : FormGroup;
  //crear variable submited para que cuando que cambie al precionar
  submitted = false;
  //spinner
  spinner = false;
  //si cae id por url es para editar, si viene vacio para crear
  id : string | null;
  //titulo boton 
  tituloBtn = "cargar cliente";
  //titulo form
  tituloForm = "Cargar nuevo";



  constructor( 
    //Modulo formularios
    private fb: FormBuilder  , 
    //servicio al backend
    private EmpleadoService: EmpleadoService , 
    private router : Router , 
    private toastr: ToastrService,
    //modulo para capturar el id de la url
    private aRoute: ActivatedRoute
  ){
    //recolectar los datos del form + validarlos
    this.createCliente = this.fb.group({
      nombre:['', Validators.required],
      mail:['', Validators.required],
      tel:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      limit:['', Validators.required],
    });
    //capturar el id
    this.id = aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    //al iniciar el componente se comienza la edicion llenando los campos
    this.comienzaEdicion();
  }
  //captura el nuevo cliente y evalua si crear o editar.
  agregarCliente(){
    //pongo al submited como true
    this.submitted = true;
    //spiner on
    this.spinner = true;
    //validacion form
    if(this.createCliente.invalid){
      return;
    };
    //evaluo si viene id por url o no, para ver si ejecuto crear o editar
    if(this.id === null){
      this.agregarClienteNuevo()
    }else{
      this.actualizarClienteEditado(this.id)
    };
  }

  //captura un cliente para crear un nuevo registro 
  agregarClienteNuevo(){

    //crear un objeto con os datos
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      mail: this.createCliente.value.mail,
      tel: this.createCliente.value.tel,
      city: this.createCliente.value.city,
      state: this.createCliente.value. state,
      limit: this.createCliente.value.limit,
      fechaCreacion: new Date(),
      fechaActualiza: new Date()
    };

    //envio el cliente al servicio para guardar
    this.EmpleadoService.agregarCliente(cliente).then( () => {
      try{
        this.spinner = false
        this.toastr.success('Has cargado un nuevo cliente exitosamente!', 'NUEVO CLIENTE' , {
          positionClass: 	'toast-bottom-right'
        });
        //redirect
        this.router.navigate(['/']);
      }catch( err ){
        console.log( err )
        this.spinner = false
      };
    });
  };


  //captura un cliente para editar
  comienzaEdicion(){
    //ejecutar el modo edicion
    if(this.id !== null){
      this.tituloBtn = "guardar edicion"
      this.tituloForm = "Editar cliente activo"
      this.EmpleadoService.obtenerCliente(this.id).subscribe( data =>{

        //volver a llenar el form
        this.createCliente.setValue({
          nombre: data.payload.data()['nombre'],
          mail: data.payload.data()['mail'],
          tel:data.payload.data()['tel'],
          city: data.payload.data()['city'],
          state: data.payload.data()['state'],
          limit:data.payload.data()['limit'],
        });

      });
    };
  };

  //actualiza el cliente mediante el servicio
  actualizarClienteEditado(id: string){
    //construyo el objeto con los datos editados
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      mail: this.createCliente.value.mail,
      tel: this.createCliente.value.tel,
      city: this.createCliente.value.city,
      state: this.createCliente.value. state,
      limit: this.createCliente.value.limit,
      fechaActualiza: new Date()
    };
    //y ejecuto el servicio para enviarlo
    this.EmpleadoService.actualizarCliente(id, cliente).then( () =>{

      try{
        this.spinner = false
        this.toastr.info('Has editado los datos del cliente exitosamente!', 'REGISTRO EDITADO' , {
          positionClass: 	'toast-bottom-right'
        });
        //redirect
        this.router.navigate(['/']);
      }catch( err ){
        console.log(err)
        this.spinner = false
      };

    });
  };
}
