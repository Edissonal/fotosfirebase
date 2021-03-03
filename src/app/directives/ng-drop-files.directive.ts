import { Directive,EventEmitter,ElementRef,HostListener,Input,Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {


  constructor() { }
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();


  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return
    } 

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    
    
  
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    
    console.log(archivosLista);

    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      if (this._archivoPuedesercargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
      console.log(this.archivos);
    }
  }

  //validaciones
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }
 
  private _archivoYafueDropeado(nombreArchivo:string):boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log('El archivo' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _esImgen(tipoarchivo: string): boolean{
    return (tipoarchivo === '' || tipoarchivo === undefined) ? false : tipoarchivo.startsWith('image'); 
  }

  private _archivoPuedesercargado(archivo:File):boolean {
    if (!this._archivoYafueDropeado(archivo.name) && this._esImgen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }
}
