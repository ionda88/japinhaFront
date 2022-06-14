import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SobreComponent} from "./sobre/sobre.component";
import {InicioComponent} from "./inicio/inicio.component";
import {CarrinhoComponent} from "./carrinho/carrinho.component";
import {LocalizacaoComponent} from "./localizacao/localizacao.component";
import {CategoriasItensComponent} from "./categorias-itens/categorias-itens.component";
import {CategoriasComponent} from "./categorias/categorias.component";

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'localizacao', component: LocalizacaoComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categoriasItens', component: CategoriasItensComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
