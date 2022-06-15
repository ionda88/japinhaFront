import { Component, OnInit } from '@angular/core';
import {collection, collectionData, doc, Firestore, getDocs, query, setDoc, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Categoria} from "../../entities/categoria";
import {CategoriaItens} from "../../entities/categoriaItens";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  selecao = true;
  listaCategoria: Categoria[] = [];
  listaCategoriaItens: CategoriaItens[] = [];

  categoriasCollection = collection(this.firestore, 'categorias');

  incluindo = false;
  incluindoItem = false;

  categoriaIncluir = new Categoria();
  categoriaItemIncluir = new CategoriaItens();

  categoriaSelecionada = new Categoria();
  categoriaItemSelecionada = new CategoriaItens();

  constructor(public firestore: Firestore) {


  }

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
          vlPreco: data.data()['vlPreco']
        };
        this.listaCategoriaItens.push(categoriaItem);
      });
    });
  }

  addCategoria() {
    this.incluindo = true;
    // let categoria = {
    //   cdCategoria: "comida",
    //   deCategoria: "comida gostosa"
    // };
    // this.listaCategoria.push(categoria);
  }

  addCategoriaItem() {
    this.incluindoItem = true;
  }

  async salvarNovaCategoria() {
   // let novaCategoria = structuredClone(this.categoriaIncluir);
   // this.listaCategoria.push(novaCategoria);

    const q = query(this.categoriasCollection, where("cdCategoria", "==", this.categoriaIncluir.cdCategoria));
    const querySnapshop = await getDocs(q);

    if (querySnapshop.empty) {
      let newDocRef = doc(this.categoriasCollection, this.categoriaIncluir.cdCategoria);
      let categoriaDoc = {
        cdCategoria: this.categoriaIncluir.cdCategoria,
        deCategoria: this.categoriaIncluir.deCategoria,
      }
      await setDoc(newDocRef, categoriaDoc);

      alert("Cadastrado com sucesso!");
    } else {
      alert("Categoria já cadastrada!");
    }

    this.incluindo = false;
    this.categoriaIncluir = new Categoria();
    this.setarListaCategorias();
  }

  cancelarInclusao() {
    this.incluindo = false;
    this.categoriaIncluir = new Categoria();
  }

  editCategoria(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.setarListaCategoriasItens();
    this.selecao = false;
  }

  voltarCategoriasItens() {
    this.categoriaSelecionada = new Categoria();
    this.setarListaCategorias();
    this.selecao = true;
  }

  async salvarNovaCategoriaItem() {
    let categoriasItensCollection = collection(this.firestore, 'categorias', this.categoriaSelecionada.cdCategoria, 'categoriasItens');
    const q = query(categoriasItensCollection, where("cdItem", "==", this.categoriaItemIncluir.cdItem));
    const querySnapshop = await getDocs(q);

    if (querySnapshop.empty) {
      let newDocRef = doc(categoriasItensCollection, this.categoriaItemIncluir.cdItem);
      let categoriaItemDoc = {
        cdItem: this.categoriaItemIncluir.cdItem,
        deItem: this.categoriaItemIncluir.deItem,
        deDescricao: this.categoriaItemIncluir.deDescricao,
        deUrlFotoItem: this.categoriaItemIncluir.deUrlFotoItem,
        vlPreco: this.categoriaItemIncluir.vlPreco
      }
      await setDoc(newDocRef, categoriaItemDoc);

      alert("Cadastrado com sucesso!");
    } else {
      alert("Categoria item já cadastrado!");
    }

    this.incluindoItem = false;
    this.categoriaItemIncluir = new CategoriaItens();
    this.setarListaCategoriasItens();
  }

  cancelarInclusaoItem() {
    this.incluindoItem = false;
    this.categoriaItemIncluir = new CategoriaItens();
  }
}
