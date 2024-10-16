export class Actor {
  id: string;
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
    this.id = '';
  }

  setId(id: string) {
    this.id = id;
  }
}
