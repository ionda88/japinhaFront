import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {AuthService} from "../services/auth.service";
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import {set} from "@angular/fire/database";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuariosCollection = collection(this.firestore, 'usuarios');
  constructor(public authService: AuthService,public firestore: Firestore) {

  }

  modo = "login";

  // emailLogin: any;
  // senhaLogin:any;
  //
  // nomeCadastro:any;
  // emailCadastro:any;
  // senha1Cadastro:any;
  // senha2Cadastro:any;
  usuario: Usuario = new Usuario();

  ngOnInit(): void {
  }

  async cadastrar() {
    if(this.usuario.senha != this.usuario.confirmaSenha) {
      this.modo = 'cadastro';
      alert("Senhas não coincidem!");
    } else {
      const q = query(this.usuariosCollection, where("deEmail", "==", this.usuario.email));
      const querySnapshop = await getDocs(q);

      if (querySnapshop.empty) {
        let newDocRef = doc(this.usuariosCollection, this.usuario.email);
        let usuarioDoc = {
          email: this.usuario.email,
          nome: this.usuario.nome,
          senha: this.usuario.senha,
          cpf: this.usuario.cpf,
          dtNascimento: this.usuario.dtNascimento,
          nuTelefone: this.usuario.nuTelefone
        }
        setDoc(newDocRef, usuarioDoc);

        alert("Cadastrado com sucesso!");
        this.modo = 'login';
      } else {
        alert("Email já cadastrado!");
      }
    }
  }


  async login() {
    const q = query(this.usuariosCollection, where("email", "==", this.usuario.email));
    const querySnapshop = await getDocs(q);

    if (querySnapshop.empty) {
      alert("Email não cadastrado");
    } else {
      let usuarioFire = querySnapshop.docs[0].data();
      if(usuarioFire['senha'] == this.usuario.senha) {
        alert("Logado com sucesso!");
      } else {
        alert("Senha incorreta!");
      }
      // this.authService.usuario = usuarioFire;
    }
  }
}
