import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/infoPagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  info: infoPagina = {};
  cargada = false;

  infoEquipo: any[] = [];

  constructor( private http: HttpClient) {    
    this.getInfo();
    this.getEquipo();
  }

  private getInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: infoPagina)=>{
      setTimeout(()=>{
        this.cargada = true;
        this.info = resp;
      },1000);
      
    })
  }

  private getEquipo() {
    this.http.get('https://mi-portafolio-e327a.firebaseio.com/equipo.json')
             .subscribe((resp: any[]) => {
               this.infoEquipo = resp;
             })
  }
}
