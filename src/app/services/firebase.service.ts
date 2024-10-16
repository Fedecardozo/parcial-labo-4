import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  storage: AngularFireStorage = inject(AngularFireStorage);

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  //Agregar una imagen a la base de datos
  // async agregarImagenDb(img: Imagen, nameCollection: string) {
  //   const colImagenes = this.firestore.collection(nameCollection);
  //   const documento = colImagenes.doc(img.fecha.toString());
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