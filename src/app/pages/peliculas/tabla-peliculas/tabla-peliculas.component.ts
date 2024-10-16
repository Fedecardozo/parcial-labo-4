import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css',
})
export class TablaPeliculasComponent {
  @Input() peliculaSeleccionada: Pelicula[] = [];
  @Output() avisarSeleccion = new EventEmitter<void>();
  @Input() listaPeliculas: Pelicula[] = [];

  seleccionPelicula(pelicula: Pelicula) {
    const classStyle = pelicula.getClase();
    pelicula.setClase(classStyle + ' active');
    if (this.peliculaSeleccionada[0]) {
      this.peliculaSeleccionada[0].setClase(classStyle);
    }
    this.peliculaSeleccionada[0] = pelicula;
    this.avisarSeleccion.emit();
  }
}
