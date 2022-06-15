import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { SobreComponent } from './sobre/sobre.component';
import { InicioComponent } from './inicio/inicio.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import {AuthService} from "./services/auth.service";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CardapioComponent } from './cardapio/cardapio.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import {InputNumberComponent} from "./global/inputnumber/inputnumber.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SobreComponent,
    InicioComponent,
    CarrinhoComponent,
    LocalizacaoComponent,
    CardapioComponent,
    CategoriasComponent,
    PedidosComponent,
    InputNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
