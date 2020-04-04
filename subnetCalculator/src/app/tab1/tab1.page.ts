import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public toastController: ToastController) { }

  @ViewChild('inputConverterBinary', { read: ElementRef, static: false }) inputConverterBinary: ElementRef;
  @ViewChild('inputConverterAddress', { read: ElementRef, static: false }) inputConverterAddress: ElementRef;

  async createToast(msg: string) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  Convert2Binary() {
    
    const inputAddress = this.inputConverterAddress.nativeElement.value;

    if (this.ValidateIPaddress(inputAddress)){
      const octects = inputAddress.split('.');

      const binaryOctects = octects.map(function (el) {
        let binaryEl = parseInt(el).toString(2);
        for (var i = binaryEl.length; i < 8; i++) {
          binaryEl = '0' + binaryEl;
        }
        return binaryEl;
      });
  
      const binaryAddress = binaryOctects.join('.');
  
      this.inputConverterBinary.nativeElement.value = binaryAddress;
    } else {
      this.createToast("You have entered an invalid IP address!");
    }
  }

  ValidateIPaddress(ipAddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {  
      return (true)  
    }  
    return (false)  
  }

}
