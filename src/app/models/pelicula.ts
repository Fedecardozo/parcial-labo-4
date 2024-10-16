export class Pelicula {
  ID: string;
  Nombre: string;
  Tipo: string; //{terror, comedia, amor, otros}
  FechaEstreno: string;
  CantidadPublico: string;
  FotoPelicula: string;
  Protagonista: string;

  constructor(
    id: string,
    nombre: string,
    tipo: string,
    fechaEstreno: string,
    cantidaPublico: string,
    fotoPelicula: string,
    protagonista: string
  ) {
    this.ID = id;
    this.Nombre = nombre;
    this.Tipo = tipo;
    this.FechaEstreno = fechaEstreno;
    this.CantidadPublico = cantidaPublico;
    this.FotoPelicula = fotoPelicula;
    this.Protagonista = protagonista;
  }
}
