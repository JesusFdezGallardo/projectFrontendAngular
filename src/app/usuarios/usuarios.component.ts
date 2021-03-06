//Importaciones de los componentes que uso en esta página
import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {Rol} from './rol';
import {UsuarioService} from './usuario.service';
import Swal from 'sweetalert2';
import {AuthService} from '../usuarios/login/auth.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  //Objetos que se utilizan luego en el component html
  usuarios: Usuario[] ;
  roles: Rol[];
  alumnos: Usuario[];
  //constructor para cargar las clases
  constructor(private usuarioService : UsuarioService,
              public authService: AuthService) { }
  //Damos valor de inicio a los objetos creados antes
  ngOnInit(): void {
    //Carga el observador
    this.usuarioService.getAlumnos().subscribe(
      //Argumentos del observador
      usuarios => this.alumnos = usuarios
      );
    this.usuarioService.getUsuarios().subscribe(
        //Argumentos del observador
      usuarios => this.usuarios = usuarios
      );
    }
    //Usamos evento click para conseguir el idUsuario
    delete(usuario: Usuario): void{
      //Librería de JavaScript para mostrar alertas y diálogos de confirmación
      Swal.fire({
          title: '¿Estás seguro?',
          text: `Borrarás a ${usuario.nombre}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, ¡Bórralo!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.usuarioService.delete(usuario.idUsuario).subscribe(
              response => {         //El método filtrer de Array para no mostrar usuario eliminado
                this.usuarios = this.usuarios.filter(user => user !== usuario)
                Swal.fire(
                  'Eliminado!',
                  'El usuario ha sido eliminado con éxito',
                  'success'
                )
              }
            )
          }
        })
      }
    }
