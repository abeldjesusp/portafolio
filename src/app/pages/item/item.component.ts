import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoInformacion } from '../../interfaces/productoInformacion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  producto: ProductoInformacion;
  id: string;

  constructor(private route: ActivatedRoute,
              public productosService: ProductosService) { }

  ngOnInit() {

    this.route.params
        .subscribe(parametros => {
          this.productosService.getProducto(parametros['id'])
              .subscribe((producto: ProductoInformacion) => {
                this.producto = producto;
                this.id = parametros['id'];
              });
        });

  }

}
