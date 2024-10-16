import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { Actor } from '../../../models/actor';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-listado-actores',
  standalone: true,
  imports: [],
  templateUrl: './listado-actores.component.html',
  styleUrl: './listado-actores.component.css',
})
export class ListadoActoresComponent {
  sub?: Subscription;
  private fire: FirebaseService = inject(FirebaseService);
  listaActores: Actor[] = [];
  actorSeleccionado?: Actor;
  util: UtilsService = inject(UtilsService);

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

  seleccionActor(actor: Actor) {
    const classStyle = actor.getClase();
    actor.setClase(classStyle + ' active');
    if (this.actorSeleccionado) {
      this.actorSeleccionado.setClase(classStyle);
    }
    this.actorSeleccionado = actor;
  }
}
