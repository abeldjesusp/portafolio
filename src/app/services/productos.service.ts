import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  items : item[] = [];

  constructor(private http: HttpClient) { 
    this.getProductos();
  }

  private getProductos() {
    this.http.get('https://mi-portafolio-e327a.firebaseio.com/productos_idx.json')
             .subscribe( (resp: item[]) => {
               console.log((resp));
               this.items = resp;
               this.cargando = false;
             });
    
  } 
}
