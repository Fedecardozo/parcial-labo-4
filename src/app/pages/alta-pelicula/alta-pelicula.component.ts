import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
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
import { Pelicula } from '../../models/pelicula';
@Component({
  selector: 'app-alta-pelicula',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './alta-pelicula.component.html',
  styleUrl: './alta-pelicula.component.css',
})
export class AltaPeliculaComponent {
  sub?: Subscription;
  private fire: FirebaseService = inject(FirebaseService);
  listaActores: Actor[] = [];
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  actorSelecionada?: Actor;
  guardar: boolean = false;
  tipos: string[] = Pelicula.tipos;
  errorImg: string = '';
  imagenCargada: File | null = null;
  spinner: boolean = true;
  textSpinner: string = 'Cargando formulario...';

  constructor() {
    this.fg = this.fb.group({
      nombre: ['', [Validators.required]],
      imagen: [''],
      tipo: [this.tipos[0]],
      fecha: ['', [Validators.required]],
      candidad: ['', [Validators.required, this.validDocument]],
    });
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
          this.listaActores.push(actorAux);
        });

        this.spinner = false;
      });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  async acceder() {
    this.guardar = true;
    if (this.fg.valid && this.actorSelecionada && this.validarImagen()) {
      this.spinner = true;
      this.textSpinner = 'Subiendo imagen...';
      const url = await this.guardarImagen();
      this.fire
        .agregarPelicula(
          new Pelicula(
            this.fg.controls['nombre'].value,
            this.fg.controls['tipo'].value,
            this.fg.controls['fecha'].value,
            this.fg.controls['candidad'].value,
            url,
            this.actorSelecionada.id
          )
        )
        .then(() => {
          Alert.bien('Se cargo con exito!');
          this.fg.reset();
        })
        .catch((res) => {
          Alert.mal(
            'No se pudo cargar a la base de datos!',
            'Intentelo más tarde.'
          );
          console.log(res);
        })
        .finally(() => {
          this.spinner = false;
        });
    }
  }
  //VALIDADOR
  validDocument(control: AbstractControl) {
    if (Number.parseInt(control.value) < 0) {
      return { cantidadDoc: true };
    }
    return null;
  }
  selectActor(actor: Actor) {
    const classStyle: string = actor.getClase();
    if (this.actorSelecionada) {
      this.actorSelecionada.setClase(classStyle);
    }
    this.actorSelecionada = actor;
    this.actorSelecionada.setClase(classStyle + ' ' + 'bg-info');
  }

  validarImagen(): boolean {
    console.log(this.fg.controls['imagen']);
    if (this.fg.controls['imagen'].value === '') {
      this.errorImg = 'Este campo es requerido';
      return false;
    }
    return true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenCargada = file; // Guardamos el archivo cargado
    } else {
      this.imagenCargada = null;
    }
  }

  async guardarImagen() {
    if (this.imagenCargada) {
      return await this.fire.subirImg(this.imagenCargada);
    }
  }
}
