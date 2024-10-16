import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'actores',
    loadComponent: () =>
      import('./pages/actores/actores.component').then(
        (m) => m.ActoresComponent
      ),
  },
  {
    path: 'AltaPelicula',
    loadComponent: () =>
      import('./pages/alta-pelicula/alta-pelicula.component').then(
        (m) => m.AltaPeliculaComponent
      ),
  },
  {
    path: 'AltoActor',
    loadComponent: () =>
      import('./pages/alto-actor/alto-actor.component').then(
        (m) => m.AltoActorComponent
      ),
  },
  {
    path: 'Peliculas',
    loadComponent: () =>
      import('./pages/peliculas/peliculas.component').then(
        (m) => m.PeliculasComponent
      ),
  },
];
