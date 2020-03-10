import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { Medico } from '../../models/medico.mode';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  hospital: Hospital = new Hospital('');

  constructor(private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private router: Router, private actR: ActivatedRoute,
              private modalService: ModalUploadService) {
    actR.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((res:any) => this.hospitales = res.hospitales);
    this.modalService.notification.subscribe( res => {
      this.medico.img = res.medico.img;
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospitalId(id).subscribe((res: any) => {
      console.log(res);
      this.hospital = res.hospital;
    });
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedicoById(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this.modalService.mostrarModal('medicos', this.medico._id);
  }

}
