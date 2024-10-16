import { Component, Input } from '@angular/core';
import { Pais } from '../../../models/pais';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css',
})
export class DetallePaisComponent {
  @Input() pais?: Pais;
}
