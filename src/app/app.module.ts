import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
//settings de firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//componentes de la app
import { AppComponent } from './app.component';
import { ListaEmpleadossComponent } from './componets/lista-empleadoss/lista-empleadoss.component';
import { CreateEmpleadosComponent } from './componets/create-empleados/create-empleados.component';
import { NavComponent } from './componets/nav/nav.component';
import { ErrorComponent } from './componets/error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadossComponent,
    CreateEmpleadosComponent,
    NavComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //agregar los nuevos modulos
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //agregar modulo formularios reactivos
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
