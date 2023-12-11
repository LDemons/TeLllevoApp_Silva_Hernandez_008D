import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from 'rxjs';


@Component({
  selector: 'app-perfilpasajero',
  templateUrl: './perfilpasajero.page.html',
  styleUrls: ['./perfilpasajero.page.scss'],
})
export class PerfilpasajeroPage implements OnInit {

  
    id:string= '';
    username:string ='';
    email:string ='';
    edad:string ='';
    password:string ='';
    matricula:string ='';
    modelo:string ='';
    jornada:string = '';
    role:string ='';
  


  constructor(private authService: AuthService,
    private router: Router,
    private alertcontroller: AlertController
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.id = sessionStorage.getItem('id')||'';
    this.username = sessionStorage.getItem('username')||'';
    this.email = sessionStorage.getItem('email')||'';
    this.edad = sessionStorage.getItem('edad')||'';
    this.password = sessionStorage.getItem('password')||'';
    this.matricula = sessionStorage.getItem('matricula')||'';
    this.modelo = sessionStorage.getItem('modelo')||'';
    this.jornada = sessionStorage.getItem('jornada')||'';
    this.role = sessionStorage.getItem('role')||'';
  
  }
  ObtenerRol(): string {
    this.role = sessionStorage.getItem('role')||'';
    return this.role
  }

  ActualizarDatos(){
    const idUsuario = Number(this.id);
    const dato = {
      username: this.username,
      email: this.email,
      edad: Number (this.edad),
      password: this.password,
      matricula: this.matricula,
      modelo: this.modelo,
      jornada: this.jornada,
      role: this.role
    };
    this.authService.ActualizarUsuario(idUsuario,dato).subscribe(
      async(usuarioActualizado) => {
        console.log('Usuario actualizado:', usuarioActualizado);
        sessionStorage.setItem('username', this.username)
        sessionStorage.setItem('email', this.email)
        sessionStorage.setItem('edad', this.edad)
        sessionStorage.setItem('password', this.password)
        sessionStorage.setItem('matricula', this.matricula)
        sessionStorage.setItem('modelo', this.modelo)
        sessionStorage.setItem('jornada', this.jornada)
        sessionStorage.setItem('role', this.role)
      }
    );
    
  }
  

}
