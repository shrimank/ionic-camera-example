import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  options:CameraOptions;
  takenPicture:any;
  imgData:string;

  constructor(private camera: Camera,private loadingCtrl: LoadingController) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  }

  clickPicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.presentLoadingDefault();
      this.imgData=imageData;

      this.takenPicture = `data:image/jpeg;base64,${imageData}`;
      
   }, (err) => {
      console.log("failed to take picture:",err);
      alert(err);
     });
    
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  

}
