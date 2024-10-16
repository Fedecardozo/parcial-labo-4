import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Pais } from '../../models/pais';

@Component({
  selector: 'app-alto-actor',
  standalone: true,
  imports: [],
  templateUrl: './alto-actor.component.html',
  styleUrl: './alto-actor.component.css',
})
export class AltoActorComponent {
  sub?: Subscription;
  private apiRest: ApiService = inject(ApiService);
  listaPaises: Pais[] = [];

  ngOnInit(): void {
    this.sub = this.apiRest.getPaises().subscribe((paises: any) => {
      paises.map((auxPais: any) => {
        let pais: Pais = new Pais(
          auxPais.name.common,
          auxPais.region,
          auxPais.flags.svg
        );

        this.listaPaises.push(pais);
      });
    });
  }

  ngAfterViewInit(): void {
    console.log(this.listaPaises);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
