import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Pais } from '../../models/pais';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-alto-actor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alto-actor.component.html',
  styleUrl: './alto-actor.component.css',
})
export class AltoActorComponent {
  sub?: Subscription;
  private apiRest: ApiService = inject(ApiService);
  listaPaises: Pais[] = [];
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;

  constructor() {
    this.fg = this.fb.group({
      nombre: ['', [Validators.required, this.noCaracteresEspeciales]],
      apellido: ['', [Validators.required, this.noCaracteresEspeciales]],
      documento: ['', [Validators.required, this.validDocument]],
      edad: ['', [Validators.required, this.validDocument]],
    });
  }

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
      this.listaPaises.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  acceder() {
    if (this.fg.valid) {
      //Cargar a la base de datos
      console.log('Se cargo con exito');
    } else {
      console.log(this.fg.controls['documento'].errors);
      console.log('sos un boludo');
    }
  }

  // Validador personalizado
  noCaracteresEspeciales(control: any) {
    const regex = /^[a-zA-Z]+$/;
    if (control.value && !regex.test(control.value)) {
      return { caracteresEspeciales: true };
    }
    return null;
  }

  validDocument(control: any) {
    if (
      Number.parseInt(control.value) < 1000000 ||
      Number.parseInt(control.value) > 99999999
    ) {
      return { cantidadDoc: true };
    }
    return null;
  }
}
