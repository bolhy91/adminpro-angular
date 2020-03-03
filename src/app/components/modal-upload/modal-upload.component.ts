import { Component, OnInit } from '@angular/core';
import * as swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: any;
  constructor(public subirArchivo: SubirArchivoService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImage(archivo: any) {
    console.log(archivo);
    if (!archivo) {
      this.imagenSubir = null;
      return
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Error Imagen', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const render = new FileReader();
    let url = render.readAsDataURL(archivo);
    render.onloadend = () => {
      console.log(render.result);
      this.imagenTemp = render.result;
    };
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    this.subirArchivo.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
    .then(res => {
      this.modalUploadService.notification.emit(res);
      this.cerrarModal();
    }).catch(error => {
      console.log(error);
    });
  }

}
