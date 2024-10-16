import { Component, inject, Input } from '@angular/core';
import { Actor } from '../../../models/actor';
import { FirebaseService } from '../../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Pelicula } from '../../../models/pelicula';

@Component({
  selector: 'app-peliculas-actor',
  standalone: true,
  imports: [],
  templateUrl: './peliculas-actor.component.html',
  styleUrl: './peliculas-actor.component.css',
})
export class PeliculasActorComponent {
  @Input() actor?: Actor;
  fire: FirebaseService = inject(FirebaseService);
  sub?: Subscription;
  peliculas: Pelicula[] = [];
  peliculasActor: Pelicula[] = [];
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
        this.peliculasActor = this.peliculas.filter((valu) => {
          if (this.actor) {
            return valu.Protagonista === this.actor.id;
          } else {
            return false;
          }
        });

        console.log(this.peliculasActor);
      });
  }
}
