import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { IConductor } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulario2',
  templateUrl: './formulario2.page.html',
  styleUrls: ['./formulario2.page.scss'],
})
export class Formulario2Page implements OnInit {

  registForm2 :FormGroup;

  userdata: any;

  newConductor: IConductor = {
    id:0,
    username:'',
    email:'',
    edad:0,
    password:'',
    matricula: '',
    modelo: '',
    jornada: '',
    role: '',
  }

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private authservice: AuthService,
              private toastController: ToastController,
              private router: Router,
              private builder: FormBuilder) { 
                this.registForm2 = this.builder.group({
                  'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'email': new FormControl("",    [Validators.required]),
                  'edad': new FormControl("",    [Validators.required]),
                  'matricula': new FormControl("",    [Validators.required]),
                  'modelo': new FormControl("",    [Validators.required]),
                  'jornada': new FormControl("true",    [Validators.required])
                })
              }

  ngOnInit() {
  }

  registrarUsuario(){
    if (this.registForm2.valid){
      //implementar que el usuario no se repita, en caso que ya existe enviar un mensaje
      this.authservice.BuscarUsuarioId(this.registForm2.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registForm2.reset();
          this.errorDuplicidad();
        }
        else{
          this.newConductor.username = this.registForm2.value.username;
          this.newConductor.password = this.registForm2.value.password;
          this.newConductor.email = this.registForm2.value.email;
          this.newConductor.edad = this.registForm2.value.edad;
          this.newConductor.matricula = this.registForm2.value.matricula;
          this.newConductor.modelo = this.registForm2.value.modelo;
          this.newConductor.jornada = this.registForm2.value.jornada;
          this.newConductor.role = 'conductor';
          this.authservice.CrearUsuario(this.newConductor).subscribe();
          this.registForm2.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertController.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.newConductor.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usted '+ this.newConductor.username + ' ya esta registrado :v',
      buttons: ['OK']
    });
    alerta.present();
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  
  async showToast(msg: any){
    const toast= await this.toastController.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }
}
