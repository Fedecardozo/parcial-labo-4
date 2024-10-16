import { Component, inject, input, Input } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';

@Component({
  selector: 'app-peliculas-actor',
  standalone: true,
  imports: [],
  templateUrl: './peliculas-actor.component.html',
  styleUrl: './peliculas-actor.component.css',
})
export class PeliculasActorComponent {
  @Input() peliculasActor: Pelicula[] = [];
}
