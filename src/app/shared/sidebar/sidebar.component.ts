import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  public usuario: any;


  constructor( private sidebarService: SidebarService, 
              private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems)
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
