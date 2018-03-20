import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";

// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';

import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hayMas:boolean=true;
  // posts: Observable<any[]>;

  constructor(private modalCtrl: ModalController,
              private _cap:CargaArchivoProvider,
              private socialSharing: SocialSharing) {
      // this.posts = afDB.list('post').valueChanges();
  }



  mostrar_modal(){
    let modal = this.modalCtrl.create( SubirPage);
    modal.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

      this._cap.cargar_imagenes().then((hayMas:boolean)=>{
        console.log(hayMas);
        this.hayMas = hayMas;
        infiniteScroll.complete();
      })

  }

  compartir(post:any){

      this.socialSharing.canShareVia("com.apple.social.facebook").then(()=>{
            console.log("compartire vía facebook...");
            this.socialSharing.shareViaFacebook("Mira te comparto:", post.titulo, post.img).then(()=>console.log("se compartio")).catch(
              error => console.log("no se pudo compartir:",JSON.stringify(error))
            );

      }).catch(error=>{
        console.log("No se puede enviar:",JSON.stringify(error));
      });

  }

}
