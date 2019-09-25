import { Component, OnInit } from '@angular/core';
import { ProjectosService } from '../../services/projectos.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  constructor(public projectosService: ProjectosService) { }

  ngOnInit() {
  }

}
