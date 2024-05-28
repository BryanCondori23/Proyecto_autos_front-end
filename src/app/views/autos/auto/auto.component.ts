import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { AutoModel } from '../models/auto.models';
import { AutoService } from '../services/auto.service';

@Component({
  selector: 'app-auto',
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent,
            CardHeaderComponent, CardBodyComponent,
            ReactiveFormsModule ,FormsModule, FormDirective,
            FormSelectDirective,FormControlDirective,
             FormLabelDirective, ButtonDirective, NgStyle,
             TextColorDirective,
             TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.scss'
})
export class AutoComponent {
  listaAutos : AutoModel[] = [];
  autoModelo : AutoModel = new AutoModel();
  /**
   *
   */
  constructor(private autoService: AutoService) {
    this.getAutos();

  }

  getAutos(){
    this.autoService.getAutos().subscribe({
      next : (respuesta) => {
          console.log(respuesta);
          this.listaAutos = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  guardarAuto(){
    console.log(this.autoModelo);
    if (this.autoModelo._id == '') {
      console.log("guardar", this.autoModelo);
      this.agregarAuto();
    } else {
      console.log("editar", this.autoModelo);
      this.editarAuto();
    }


  }
  //metodos
  agregarAuto(){
    this.autoService.agregarautos(this.autoModelo).subscribe({
      next : (respuesta) => {
          console.log("Se guardo exitosamente",respuesta);
          this.getAutos();
          this.autoModelo = new AutoModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  eliminarAuto(auto: AutoModel){
    console.log("itema para eliminar", auto);
    this.autoService.eliminarAuto(auto._id).subscribe({
      next : (respuesta) => {
          console.log("Se elimino exitosamente",respuesta);
          this.getAutos();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  verAuto(auto: AutoModel){
    this.autoModelo = auto;
  }

  editarAuto(){
    this.autoService.editarautos(this.autoModelo).subscribe({
      next : (respuesta) => {
          console.log("Se edito exitosamente",respuesta);
          this.getAutos();
          this.autoModelo = new AutoModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}








