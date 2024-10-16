export class Actor {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  edad: string;
  pais: string;
  private clase: string;

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
    this.clase = 'list-group-item d-flex justify-content-between lh-sm';
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
