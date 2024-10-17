import Swal from 'sweetalert2';
export class Alert {
  static bien(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    });
  }

  static mal(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    });
  }
}
