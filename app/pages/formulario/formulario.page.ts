import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { MenuController } from '@ionic/angular';
import { IUsuario } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  userdata: any;

  newUsuario: IUsuario = {
    id:0,
    username:'',
    email:'',
    edad:0,
    password:'',
    jornada: '',
    role:'pasajero'
  }

  registForm :FormGroup;

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private authservice: AuthService,
              private toastController: ToastController,
              private router: Router,
              private builder: FormBuilder) { 
                this.registForm = this.builder.group({
                  'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'email': new FormControl("",    [Validators.required]),
                  'edad': new FormControl("",    [Validators.required]),
                  'jornada': new FormControl("true",    [Validators.required])
                })
              }

  ngOnInit() {
  }

  registrarUsuario(){
    if (this.registForm.valid){
      //implementar que el usuario no se repita, en caso que ya existe enviar un mensaje
      this.authservice.BuscarUsuarioId(this.registForm.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.newUsuario.username = this.registForm.value.username;
          this.newUsuario.password = this.registForm.value.password;
          this.newUsuario.email = this.registForm.value.email;
          this.newUsuario.edad = this.registForm.value.edad;
          this.newUsuario.jornada = this.registForm.value.jornada;
          this.newUsuario.role = 'pasajero';
          this.authservice.CrearUsuario(this.newUsuario).subscribe();
          this.registForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertController.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.newUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usted '+ this.newUsuario.username + ' ya esta registrado :v',
      buttons: ['OK']
    });
    alerta.present();
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

 // crearUsuario(){
 //     this.apiCrud.CrearAnimalito(this.newUsuario).subscribe();
 //     this.showToast('Registrado');
 //      this.router.navigateByUrl("/inicio");
 // }

  
  async showToast(msg: any){
    const toast= await this.toastController.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }
}


