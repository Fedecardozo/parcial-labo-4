export class Actor {
  nombre: string;
  apellido: string;
  documento: string;
  edad: string;
  pais: string;

  constructor(
    nombre: string,
    apellido: string,
    documento: string,
    edad: string,
    pais: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.edad = edad;
    this.pais = pais;
  }
}
