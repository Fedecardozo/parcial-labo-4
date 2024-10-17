import { Component, inject, Input } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-detalles-peliculas',
  standalone: true,
  imports: [],
  templateUrl: './detalles-peliculas.component.html',
  styleUrl: './detalles-peliculas.component.css',
})
export class DetallesPeliculasComponent {
  @Input() pelicula?: Pelicula;
  fire: FirebaseService = inject(FirebaseService);
}
