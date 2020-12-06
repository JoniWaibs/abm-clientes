import { Injectable } from '@angular/core';
//importar agnular firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {
  
  constructor(private firestore: AngularFirestore  ) {  }

  //metodo que recibe un clietne y lo envia a firebase
  agregarCliente( cliente: any ):Promise<any>{
    return this.firestore.collection('clientes').add(cliente)
  };
  //metodo que obtiene los clientes
  obtenerClientes():Observable<any>{
    return this.firestore.collection('clientes' , ref => ref.orderBy('fechaCreacion')).snapshotChanges()
  };
  //metodo para eliminar
  eliminarCliente(id: string):Promise<any>{
    return this.firestore.collection('clientes').doc(id).delete()
  };
  //obtener un clietne para editar
  obtenerCliente(id : string):Observable<any>{
    return this.firestore.collection('clientes').doc(id).snapshotChanges()
  };
  //guardar el cliente editado
  actualizarCliente(id:string , cliente:any):Promise<any>{
    return this.firestore.collection('clientes').doc(id).update(cliente)
  };


}
