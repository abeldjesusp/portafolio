import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { item } from '../interfaces/item.interface';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  items : item[] = [];
  itemsFiltrado: item[] = []

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://mi-portafolio-e327a.firebaseio.com/productos_idx.json')
             .subscribe( (resp: item[]) => {
               this.items = resp;
               this.cargando = false;
               resolve();
             });
    });
  }

  public getProducto(id: string) {
    return this.http.get(`https://mi-portafolio-e327a.firebaseio.com/productos/${id}.json`);
  }

  buscarItem(termino: string){

    if(this.items.length === 0){
      // cargar productos
      this.cargarProductos().then(() => {
        // Ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarItems(termino);
      });
    } else {
      // Aplicar filtro
      this.filtrarItems(termino);
    }
  }

  private filtrarItems(termino: string){
    this.itemsFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.items.forEach(item => {
      const tituloLower = item.titulo.toLocaleLowerCase();
      if (item.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.itemsFiltrado.push(item);
      }
    });
  }

}
