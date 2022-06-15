import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'inputnumber',
  templateUrl: './inputnumber.component.html',
  styleUrls: ['./inputnumber.component.css']
})
export class InputNumberComponent implements OnInit, OnChanges {

  @Input() label = "";
  @Input() campo = 0.0;
  @Input() placeholder = "";
  @Input() idCampo = Math.random();
  @Input() helpblock = "";
  @Input() campoId = false;
  @Input() disabled = false;
  @Input() decimais = 2;
  @Input() autocomplete = "off";

  @Output() onChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  bEditando = false;
  objDecimais = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  @Input() campoFormatado = '';
  ordem = 0;

  @ViewChild('campoInput', { static: false }) campoInput: ElementRef | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    if (!this.bEditando) {

      if (this.decimais == null && this.campo != undefined || this.campo == NaN) {
        this.decimais = 2;
      }
      this.objDecimais = {
        minimumFractionDigits: this.decimais,
        maximumFractionDigits: this.decimais
      };

      if (this.campo == null || this.campo == undefined || this.campo == NaN) {
        this.campo = 0.0;
      } else if (typeof this.campo == "string") {
        this.campo = parseFloat(this.campo);
      }
      this.campo.toFixed(this.decimais);
      this.campoFormatado = this.campo.toLocaleString('pt-BR', this.objDecimais);
    }
  }

  ngOnInit() {
    if (this.decimais == null && this.campo != undefined || this.campo == NaN) {
      this.decimais = 2;
    }
    this.objDecimais = {
      minimumFractionDigits: this.decimais,
      maximumFractionDigits: this.decimais
    };
    if (this.campo === null || this.campo === undefined || this.campo == NaN) {
      this.campo = 0.0;
    } else if (typeof this.campo == "string") {
      this.campo = parseFloat(this.campo);
    }
    this.campo.toFixed(this.decimais);
    this.campoFormatado = this.campo.toLocaleString('pt-BR', this.objDecimais);
  }
  change() {
    let campoAuxNovo = '';
    let temVirgula = false;
    for (let i = 0; i < this.campoFormatado.length; i++) {
      const digito = this.campoFormatado.substr(i, 1);
      if (digito === '-' && i === 0) {
        campoAuxNovo += digito;
      } else if (digito >= '0' && digito <= '9') {
        campoAuxNovo += digito;
      } else if (digito === ',' && !temVirgula) {
        campoAuxNovo += digito;
        temVirgula = true;
      }
    }
    this.campoFormatado = campoAuxNovo;
    campoAuxNovo = this.campoFormatado.replace('.', '').replace(',', '.');

    this.campo = +campoAuxNovo;
    if (this.campo != null) {
      this.campo.toFixed(this.decimais);
    }
    this.onChange.emit(this.campo);
  }
  blur() {
    this.bEditando = false;
    if (this.campo != null) {
      this.campoFormatado = this.campo.toLocaleString('pt-BR', this.objDecimais);
      this.campo.toFixed(this.decimais);
    }
    this.onBlur.emit(this.campo);
  }
  focus() {
    this.bEditando = true;
    if (this.campo != null) {
      this.campo.toFixed(this.decimais);
    }
    this.campoFormatado = ('' + this.campo).replace('.', ',');
    // setTimeout(() => {
    //   this.campoInput.nativeElement.select();
    // }, 50);
  }
}
