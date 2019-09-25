import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Projecto } from '../interfaces/projecto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProjectosService {

  public cargando = true;
  public projectos: Projecto[] = [];
  public projectosFiltrado: Projecto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProjectos();
  }

  private cargarProjectos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://mi-portafolio-e327a.firebaseio.com/projectos_idx.json')
             .subscribe( (resp: Projecto[]) => {
               this.projectos = resp;
               this.cargando = false;
               resolve();
             });
    });
  }

  public getProjecto(id: string | number) {
    return this.http.get(`https://mi-portafolio-e327a.firebaseio.com/projectos/${id}.json`);
  }

  buscarProjecto(termino: string){

    if(this.projectos.length === 0){
      // cargar projectos
      this.cargarProjectos().then(() => {
        // Ejecutar despues de tener los projectos
        // Aplicar filtro
        this.filtrarProjectos(termino);
      });
    } else {
      // Aplicar filtro
      this.filtrarProjectos(termino);
    }
  }

  private filtrarProjectos(termino: string){
    this.projectosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.projectos.forEach(projecto => {
      const tituloLower = projecto.titulo.toLocaleLowerCase();
      if (projecto.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.projectosFiltrado.push(projecto);
      }
    });
  }
}
