import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../entities/categoria";
import {collection, Firestore, getDocs, query} from "@angular/fire/firestore";
import {CategoriaItens} from "../../entities/categoriaItens";

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
  listaCategoria: Categoria[] = [];
  listaCategoriaItens: CategoriaItens[] = [];
  listaCategoriaItensSelecionados: CategoriaItens[] = [];

  selecao = true;

  categoriaSelecionada: Categoria = new Categoria();

  categoriasCollection = collection(this.firestore, 'categorias');
  constructor(public firestore: Firestore) { }

  ngOnInit(): void {
    this.setarListaCategorias();
  }

  setarListaCategorias() {
    this.listaCategoria = [];
    getDocs(query(this.categoriasCollection)).then((dataSnapshot) => {
      dataSnapshot.forEach((data) => {
        let categoria = {
          cdCategoria: data.data()['cdCategoria'],
          deCategoria: data.data()['deCategoria']
        };
        this.listaCategoria.push(categoria);
      });
    });
  }

  validaSituacao(number: number) {

  }

  editCategoria(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.setarListaCategoriasItens();
    this.selecao = false;
  }

  setarListaCategoriasItens() {
    this.listaCategoriaItens = [];
    let categoriasItensCollection = collection(this.firestore, 'categorias', this.categoriaSelecionada.cdCategoria, 'categoriasItens');
    getDocs(query(categoriasItensCollection)).then((dataSnapshot) => {
      dataSnapshot.forEach((data) => {
        let categoriaItem = {
          cdCategoria: data.data()['cdCategoria'],
          cdItem: data.data()['cdItem'],
          deItem: data.data()['deItem'],
          deDescricao: data.data()['deDescricao'],
          deUrlFotoItem: data.data()['deUrlFotoItem'],
          vlPreco: data.data()['vlPreco'],
          quantidade: 0
        };
        this.listaCategoriaItens.push(categoriaItem);
      });
    });
  }

  addItem(categoriaItens: CategoriaItens) {
    this.listaCategoriaItensSelecionados.push(categoriaItens);
    this.selecao = true;
  }

  calculaValor(): number {
    let valor = 0.0;
    for(let item of this.listaCategoriaItensSelecionados) {
      valor += item.vlPreco * item.quantidade;
    }
    return valor;
  }

  realizarPagamento() {
    alert("Pedido Concluido!");
    alert("Aguardando pagamento!");
  }
}
