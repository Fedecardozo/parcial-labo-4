export class Pelicula {
  Nombre: string;
  Tipo: string; //{terror, comedia, amor, otros}
  FechaEstreno: string;
  CantidadPublico: string;
  FotoPelicula: string;
  Protagonista: string;
  id: string;
  static tipos: string[] = ['terror', 'comedia', 'amor', 'otros'];
  private clase: string;

  constructor(
    nombre: string,
    tipo: string,
    fechaEstreno: string,
    cantidaPublico: string,
    fotoPelicula: string,
    protagonista: string
  ) {
    this.Nombre = nombre;
    this.Tipo = tipo;
    this.FechaEstreno = fechaEstreno;
    this.CantidadPublico = cantidaPublico;
    this.FotoPelicula = fotoPelicula;
    this.Protagonista = protagonista;
    this.id = '';
    this.clase = 'list-group-item';
  }

  setId(id: string) {
    this.id = id;
  }

  setClase(clase: string) {
    this.clase = clase;
  }

  getClase() {
    return this.clase;
  }
}
