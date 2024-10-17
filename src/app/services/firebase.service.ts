import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from '@angular/fire/storage';
import { Actor } from '../models/actor';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  storage: AngularFireStorage = inject(AngularFireStorage);

  //ACTOR
  async agregarActor(actor: Actor) {
    const colUsuarios = this.firestore.collection('actores');
    const documento = colUsuarios.doc();
    actor.setId(documento.ref.id);
    return await documento.set({ ...actor.devolverEnFormaDeObj() });
  }
  getActores() {
    const col = this.firestore.collection('actores');
    return col;
  }
  getActor(id: string) {
    const col = this.firestore
      .collection('actores')
      .doc(id)
      .get()
      .subscribe((data) => {
        console.log(data.data());
      });
    // const documento = col.
  }

  //PELICULA
  async agregarPelicula(pelicula: Pelicula) {
    const colUsuarios = this.firestore.collection('peliculas');
    const documento = colUsuarios.doc();
    pelicula.setId(documento.ref.id);
    return await documento.set({ ...pelicula });
  }

  getPeliculas() {
    const col = this.firestore.collection('peliculas');
    return col;
  }

  //IMAGENES
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async subirImg(imagenCargada: any) {
    const filePath = `images/${Date.now()}_${imagenCargada.name}`; // Crear un nombre único para la imagen
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imagenCargada);

    // Monitorear el progreso de la subida
    task.percentageChanges().subscribe((progress) => {
      let uploadProgress = progress ? progress : 0;
      console.log(`Progreso de subida: ${uploadProgress}%`);
    });

    // Obtener la URL de descarga cuando la imagen se suba completamente
    return await task.then((res) => {
      return getDownloadURL(res.ref);
    });
  }

  //Agregar una imagen a la base de datos
  // async agregarImagenDb(id:string, nameCollection: string) {
  //   const colImagenes = this.firestore.collection(nameCollection);
  //   const documento = colImagenes.doc(id);
  //   // user.setId(documento.ref.id);
  //   await documento.set({ ...img });
  // }

  // //Obtener las imagenes
  // getImagenes(lindasFeas: string = 'lindas') {
  //   const col = this.firestore.collection('imagenes_' + lindasFeas);
  //   return col;
  // }

  // //Agregar los que le dan me gusta
  // updateImg(img: Imagen, cosa: string = 'lindas') {
  //   const doc = this.firestore.doc(`imagenes_${cosa}/${img.fecha}`);
  //   doc.update({ likes: img.likes });
  // }
}
