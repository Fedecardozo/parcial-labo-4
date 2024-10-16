export class Pais {
  nombre: string;
  region: string;
  bandera: string;
  clase: string;

  constructor(nombre: string, region: string, bandera: string) {
    this.nombre = nombre;
    this.region = region;
    this.bandera = bandera;
    this.clase = 'list-group-item d-flex justify-content-between lh-sm';
  }
}
