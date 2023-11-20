import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite) {
      this.crearTablas();
    }

  crearTablas() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists persona (usuario varchar(30),contrasena varchar(30), correo varchar(75), nombre varchar(30), apellido varchar(30))', [])
            .then(() => console.log('PAA: TABLA PERSONA CREADA CORRECTAMENTE'))
            .catch(e => console.log('PAA: ERROR AL REALIZAR LOGIN: ' + JSON.stringify(e)));
      })
        .catch(e => console.log('PAA: ERROR AL CREAR O ABRIR DB'));
  }

  almacenarUsuario(usuario: string, contrasena: string, correo:
  string, nombre: string, apellido: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('insert into persona values(? ,? ,? ,? ,?)', 
        [usuario, contrasena, correo, nombre, apellido])
            .then(() => console.log('PAA: PERSONA ALMACENA OK'))
            .catch(e => console.log('PAA: ERROR AL OBTENER INFORMACION DE LA PERSONA: ' + JSON.stringify(e)));
      })
        .catch(e => console.log('PAA: ERROR AL CREAR O ABRIR DB'));
  }

  loginUsuario(usuario: string, contrasena: string,) {
    return this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          return db.executeSql('select count(usuario) as cantidad from persona where usuario = ? and contrasena = ?', [usuario, contrasena])
              .then((data) => {
                return data.rows.item(0).cantidad;
              })
              .catch(e => console.log('PAA: ERROR AL ALMACENAR PERSONA: ' + JSON.stringify(e)));
        })
          .catch(e => console.log('PAA: ERROR AL CREAR O ABRIR DB'));
  }

  infoUsuario(usuario: string, contrasena: string) {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select correo, nombre, apellido from persona where usuario = ? and contrasena = ?', [usuario, contrasena])
            .then((data) => {
              let objeto: any = {};
              objeto.nombre = data.rows.item(0).nombre;
              objeto.correo = data.rows.item(0).correo;
              objeto.apellido = data.rows.item(0).apellido;

              return objeto; 
            })
            .catch(e => console.log('PAA: ERROR AL ALMACENAR PERSONA: ' + JSON.stringify(e)));
      })
        .catch(e => console.log('PAA: ERROR AL CREAR O ABRIR DB')); 

  }

  cambiarContrasena(usuario: string, contrasenaActual: string,
    contrasenaNueva: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('update persona set contrasena = ? where usuario = ? and contrasena = ?', [contrasenaNueva,
        usuario, contrasenaActual])
            .then(() => console.log('PAA: PERSONA MODIFICADA OK'))
            .catch(e => console.log('PAA: ERROR MODIFICAR PERSONA: ' + JSON.stringify(e)));
      })
        .catch(e => console.log('PAA: ERROR AL CREAR O ABRIR DB'));
  }
}
