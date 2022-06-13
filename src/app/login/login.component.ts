import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../entities/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modo = "login";

  // emailLogin: any;
  // senhaLogin:any;
  //
  // nomeCadastro:any;
  // emailCadastro:any;
  // senha1Cadastro:any;
  // senha2Cadastro:any;
  usuario: Usuario = new Usuario();
  constructor() { }

  ngOnInit(): void {
  }

  cadastrar() {
    if(this.usuario.senha != this.usuario.confirmaSenha) {
      this.modo = 'cadastro';
      alert("Senhas não coincidem!");
    }
  }
}
