import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';
import { HospitalService } from '../../services/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(public modalUpload: ModalUploadService,
              public hospitalService: HospitalService) {
    this.modalUpload.notification.subscribe(res => {
      this.cargarHospitales();
    });
              }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
    .subscribe((res: any) => {
      this.cargando = false;
      this.totalRegistros = res.total;
      this.hospitales = res.hospitales;
    });
  }


  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((hospital: Hospital) => {
      this.cargando = false;
      this.hospitales = hospital;
      console.log(hospital);
    });
  }

  borrarHospital(hospital: Hospital) {
    if (confirm("Esta seguro de eliminar al hospital?")) {
      this.hospitalService.borrarHospital(hospital._id).subscribe(res => {
        this.cargarHospitales();
      });
    }
  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
    .subscribe();
  }

  mostrarModal(id: string) {
    this.modalUpload.mostrarModal('hospitales', id);
  }

}
