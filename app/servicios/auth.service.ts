import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsuario, IUsuarios, IConductor, ICondutors } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
  export class AuthService {

  constructor(private httpclient: HttpClient) { }

  //obtenemos un observable con todos los usuarios almacenados
  GetAllUsers():Observable<IUsuarios>{
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/usuarios`);
  }

  //obtenemos un observable con la información que se busca a través de username
  GetUserById(codigo: any):Observable<IConductor>{
    return this.httpclient.get<IConductor>(`${environment.apiUrl}/usuarios/?username=${codigo}`);
  }


  //obtenemos un observable con todos los conductores almacenados
  GetAllConductors():Observable<ICondutors>{
    return this.httpclient.get<ICondutors>(`${environment.apiUrl}/usuarios`);
  }

  //obtenemos un observable con la información que se busca a través de username
  GetConductById(codigo: any):Observable<ICondutors>{
    return this.httpclient.get<ICondutors>(`${environment.apiUrl}/usuarios/?username=${codigo}`);
  }

  IsLogged(){
    return sessionStorage.getItem('username')!=null;
  }

  //usuario

  CrearUsuario(newUsuario:IUsuario): Observable<IUsuario>{
    return this.httpclient.post<IUsuarios>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  BuscarUsuarioId(id:number):Observable<IUsuarios>{
    return this.httpclient.get<IUsuarios>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  ActualizarUsuario(id:Number,dato:Partial<IConductor>):Observable<IConductor>{
    return this.httpclient.put<IConductor>(`${environment.apiUrl}/usuarios/${id}`, dato);
  }

  // CONDUCTOR

  CrearConductor(newConductor:IConductor): Observable<IConductor>{
    return this.httpclient.post<ICondutors>(`${environment.apiUrl}/usuarios`, newConductor);
  }

  BuscarConductorId(id:number):Observable<ICondutors>{
    return this.httpclient.get<ICondutors>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  ActualizarConductor(usuario:any):Observable<ICondutors>{
    return this.httpclient.put<ICondutors>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }
}