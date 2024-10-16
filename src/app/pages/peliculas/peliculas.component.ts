import { Component } from '@angular/core';
import { TablaPeliculasComponent } from './tabla-peliculas/tabla-peliculas.component';
import { DetallesPeliculasComponent } from './detalles-peliculas/detalles-peliculas.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [TablaPeliculasComponent, DetallesPeliculasComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
})
export class PeliculasComponent {}
