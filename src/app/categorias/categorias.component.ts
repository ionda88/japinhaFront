import { Component, OnInit } from '@angular/core';
import {collection, collectionData, doc, Firestore, getDocs, query, setDoc, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Categoria} from "../../entities/categoria";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  listaCategoria: Categoria[] = [];
  categoriasCollection = collection(this.firestore, 'categorias');
  incluindo = false;

  categoriaIncluir = new Categoria();

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

  addCategoria() {
    this.incluindo = true;
    // let categoria = {
    //   cdCategoria: "comida",
    //   deCategoria: "comida gostosa"
    // };
    // this.listaCategoria.push(categoria);
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
      setDoc(newDocRef, categoriaDoc);

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
}
