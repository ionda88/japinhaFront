import { Component, OnInit } from '@angular/core';
import {CategoriaItens} from "../../entities/categoriaItens";
import {Pedido} from "../../entities/pedido";
import {collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  selecao = true;
  listaPedidos: Pedido[] = [];

  constructor(public firestore: Firestore, public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
   if(this.authService.usuario.email != "") {
      this.setarListaPedidos();
    } else {
      alert("É necessário estar logado para fazer um pedido!")
     this.router.navigate(['/login']);
    }
  }

  private setarListaPedidos() {
      this.listaPedidos = [];
      getDocs(query(collection(this.firestore, 'pedidos'),where("deEmailUsuario", "==", this.authService.usuario.email))).then((dataSnapshot) => {
        dataSnapshot.forEach((data) => {
          let pedido = {
            cdPedido: data.data()['cdPedido'],
            deEmailUsuario: data.data()['deEmailUsuario'],
            dtPedido: data.data()['dtPedido'],
            vlTotalPedido: data.data()['vlTotalPedido']
          };
          this.listaPedidos.push(pedido);
        });
      });
  }

  addPedido() {
    //addpedido
  }
}
