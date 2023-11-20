import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';

  correo: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation();

    if(extras?.extras.state) {
      this.usuario = extras?.extras.state['usuario'];
      this.contrasena= extras?.extras.state['contrasena'];
    }

    this.infoUsuario();
  }

  infoUsuario() {
    this.db.infoUsuario(this.usuario, this.contrasena)
      .then(data => {
        this.correo = data.correo;
        this.nombre = data.nombre;
        this.apellido = data.apellido; 
      }) 

  }

  navegarCambiarContrasena() {
    this.router.navigate(['cambiar-contrasena']);
  }

}
