import { Component, inject } from '@angular/core';
import { ListadoActoresComponent } from './listado-actores/listado-actores.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { DetallePaisComponent } from './detalle-pais/detalle-pais.component';
import { PeliculasActorComponent } from './peliculas-actor/peliculas-actor.component';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { Actor } from '../../models/actor';
import { Subscription } from 'rxjs';
import { Pais } from '../../models/pais';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-actores',
  standalone: true,
  imports: [
    ListadoActoresComponent,
    DetalleActorComponent,
    DetallePaisComponent,
    PeliculasActorComponent,
  ],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css',
})
export class ActoresComponent {
  private fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  listaActores: Actor[] = [];
  sub?: Subscription;
  sub2?: Subscription;
  actorSeleccionado: Actor[] = [];
  pais?: Pais;
  peliculas: Pelicula[] = [];
  peliculasActor: Pelicula[] = [];

  constructor() {
    this.util.mostrarSpinner('Cargando lista de actores');
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getActores()
      .valueChanges()
      .subscribe((next) => {
        const actoresAux = next as Actor[];
        actoresAux.forEach((item) => {
          const auxPais = new Pais(
            item.pais.nombre,
            item.pais.region,
            item.pais.bandera
          );
          const actorAux = new Actor(
            item.nombre,
            item.apellido,
            item.documento,
            item.edad,
            auxPais
          );
          actorAux.setId(item.id);
          actorAux.setClase('list-group-item');
          this.listaActores.push(actorAux);
        });
        this.util.ocultarSpinner();
      });

    this.obtenerPeliculas();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  getSeleccionActor() {
    if (this.actorSeleccionado[0]) {
      this.pais = this.actorSeleccionado[0].pais;
      this.peliculasActor = this.peliculas.filter(
        (valu) => valu.Protagonista === this.actorSeleccionado[0].id
      );
    }
  }

  obtenerPeliculas() {
    this.sub2 = this.fire
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
      });
  }
}
