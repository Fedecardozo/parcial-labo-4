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
import { FirebaseService } from '../../services/firebase.service';
import { Actor } from '../../models/actor';
import { Alert } from '../../models/alert';
import { UtilsService } from '../../services/utils.service';

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
  private fire: FirebaseService = inject(FirebaseService);
  private util: UtilsService = inject(UtilsService);
  listaPaises: Pais[] = [];
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  paisSelecionada?: Pais;
  guardar: boolean = false;

  constructor() {
    this.util.mostrarSpinner('Cargando formulario');
    this.fg = this.fb.group({
      nombre: ['', [Validators.required, this.noCaracteresEspeciales]],
      apellido: ['', [Validators.required, this.noCaracteresEspeciales]],
      documento: ['', [Validators.required, this.validDocument]],
      edad: ['', [Validators.required]],
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
      this.util.ocultarSpinner();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  acceder() {
    this.guardar = true;
    if (this.fg.valid && this.paisSelecionada) {
      this.util.mostrarSpinner('Cargando a la base datos');
      this.fire
        .agregarActor(
          new Actor(
            this.fg.controls['nombre'].value,
            this.fg.controls['apellido'].value,
            this.fg.controls['documento'].value,
            this.fg.controls['edad'].value,
            this.paisSelecionada
          )
        )
        .then(() => {
          Alert.bien('Se cargo con exito!');
          this.fg.reset();
        })
        .catch(() => {
          Alert.mal(
            'No se pudo cargar a la base de datos!',
            'Intentelo más tarde.'
          );
        })
        .finally(() => {
          this.util.ocultarSpinner();
        });
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

  selectPais(pais: Pais) {
    if (this.paisSelecionada) {
      this.paisSelecionada.clase =
        'list-group-item d-flex justify-content-between lh-sm';
    }
    this.paisSelecionada = pais;
    this.paisSelecionada.clase = this.paisSelecionada.clase + ' ' + 'bg-info';
  }
}
