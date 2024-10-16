import { Component, inject } from '@angular/core';
import { ListadoActoresComponent } from './listado-actores/listado-actores.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { DetallePaisComponent } from './detalle-pais/detalle-pais.component';
import { PeliculasActorComponent } from './peliculas-actor/peliculas-actor.component';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { Actor } from '../../models/actor';
import { Subscription } from 'rxjs';

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
  actorSeleccionado: Actor[] = [];

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
          const actorAux = new Actor(
            item.nombre,
            item.apellido,
            item.documento,
            item.edad,
            item.pais
          );
          actorAux.setId(item.id);
          actorAux.setClase('list-group-item');
          this.listaActores.push(actorAux);
        });
        this.util.ocultarSpinner();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getSeleccionActor() {
    console.log(this.actorSeleccionado[0]);
  }
}
