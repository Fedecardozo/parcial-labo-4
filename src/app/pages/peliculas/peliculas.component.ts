import { Component, inject } from '@angular/core';
import { TablaPeliculasComponent } from './tabla-peliculas/tabla-peliculas.component';
import { DetallesPeliculasComponent } from './detalles-peliculas/detalles-peliculas.component';
import { Pelicula } from '../../models/pelicula';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [TablaPeliculasComponent, DetallesPeliculasComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
})
export class PeliculasComponent {
  peliculas: Pelicula[] = [];
  peliculaSeleccionada: Pelicula[] = [];
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  sub?: Subscription;

  constructor() {
    this.util.mostrarSpinner('Cargando peliculas...');
  }
  ngOnInit(): void {
    this.sub = this.fire
      .getPeliculas()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Pelicula[];
        aux.forEach((item) => {
          this.peliculas.push(
            new Pelicula(
              item.Nombre,
              item.Tipo,
              item.FechaEstreno,
              item.CantidadPublico,
              item.FotoPelicula,
              item.Protagonista
            )
          );
        });
        this.util.ocultarSpinner();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getSeleccionPelicula() {
    this.peliculaSeleccionada[0];
  }
}
