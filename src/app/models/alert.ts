import Swal from 'sweetalert2';
export class Alert {
  static bien(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
    });
  }

  static mal(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
    });
  }
}
