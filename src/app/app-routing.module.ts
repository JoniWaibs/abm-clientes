import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEmpleadossComponent } from './componets/lista-empleadoss/lista-empleadoss.component';
import { CreateEmpleadosComponent } from './componets/create-empleados/create-empleados.component';
import { ErrorComponent } from './componets/error/error.component';



//setear el ruteo con sus respectivos path + componente a renderizar
const routes: Routes = [
  {path:'', component: ListaEmpleadossComponent },
  {path:'nuevo-cliente', component: CreateEmpleadosComponent},
  {path:'editar-cliente/:id', component: CreateEmpleadosComponent},
  {path: '**' , component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
