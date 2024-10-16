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
  pais?: Pais;

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
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getSeleccionActor() {
    if (this.actorSeleccionado[0]) {
      console.log(this.actorSeleccionado[0].pais);
      this.pais = this.actorSeleccionado[0].pais;
    }
  }
}
