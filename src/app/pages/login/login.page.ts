import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-principal',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string  = '';

  constructor(private router: Router, private db:DbService) { }

  ngOnInit() {
  }
  
  ingresar() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {
        usuario: this.mdl_usuario,
        contrasena: this.mdl_contrasena
      }
    }

    this.router.navigate(['principal'], extras);
  }

  navegarCrearUsuario() {
    this.router.navigate(['crear-usuario']);
  }

  login() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {
        usuario: this.mdl_usuario,
        contrasena: this.mdl_contrasena
      }
    } 

    this.db.loginUsuario(this.mdl_usuario, this.mdl_contrasena)
        .then(data => {
          if (data ==1) {
            this.router.navigate(['principal'], extras);
          } else {
            console.log('PAA: credenciales invalidas');
          }
        })
      }
}

