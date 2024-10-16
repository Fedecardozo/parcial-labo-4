import { Component } from '@angular/core';
import { ListadoActoresComponent } from './listado-actores/listado-actores.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { DetallePaisComponent } from './detalle-pais/detalle-pais.component';
import { PeliculasActorComponent } from './peliculas-actor/peliculas-actor.component';

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
export class ActoresComponent {}
