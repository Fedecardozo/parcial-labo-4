import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
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
  @Input() actorSeleccionado: Actor[] = [];
  @Output() avisarSeleccion = new EventEmitter<void>();
  @Input() listaActores: Actor[] = [];

  seleccionActor(actor: Actor) {
    const classStyle = actor.getClase();
    actor.setClase(classStyle + ' active');
    if (this.actorSeleccionado[0]) {
      this.actorSeleccionado[0].setClase(classStyle);
    }
    this.actorSeleccionado[0] = actor;
    this.avisarSeleccion.emit();
  }
}
