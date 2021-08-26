import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../servicios/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
  archivos: FileItem[] = [];
  estaSobreElemento: Boolean = false;

  constructor(public _CargaImagenes:CargaImagenesService) { }
   
  ngOnInit() {
  }

  cargarImagenes() {
    this._CargaImagenes.cargarImagenesFirebase(this.archivos)
  }

  prueba(event) {
    console.log(event);
  }

  limpiarArchivos(){
    this.archivos=[];
  }
}
