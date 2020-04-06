import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NetworkService } from '../services/network-service.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('inputSubnetCalculatorAddress', { read: ElementRef, static: false }) inputSubnetCalculatorAddress: ElementRef;
  @ViewChild('inputSubnetCalculatorCidr', { read: ElementRef, static: false }) inputSubnetCalculatorCidr: ElementRef;
  @ViewChild('outputSubnetCalculatorNetmask', { read: ElementRef, static: false }) outputSubnetCalculatorNetmask: ElementRef;
  @ViewChild('outputSubnetCalculatorWildcard', { read: ElementRef, static: false }) outputSubnetCalculatorWildcard: ElementRef;
  @ViewChild('outputSubnetCalculatorNetwork', { read: ElementRef, static: false }) outputSubnetCalculatorNetwork: ElementRef;
  @ViewChild('outputSubnetCalculatorBroadcast', { read: ElementRef, static: false }) outputSubnetCalculatorBroadcast: ElementRef;
  @ViewChild('outputSubnetCalculatorMinHosts', { read: ElementRef, static: false }) outputSubnetCalculatorMinHosts: ElementRef;
  @ViewChild('outputSubnetCalculatorMaxHosts', { read: ElementRef, static: false }) outputSubnetCalculatorMaxHosts: ElementRef;
  @ViewChild('inputBinaryConverter', { read: ElementRef, static: false }) inputBinaryConverter: ElementRef;
  @ViewChild('outputBinaryConverter', { read: ElementRef, static: false }) outputBinaryConverter: ElementRef;
  @ViewChild('inputCidrConverter', { read: ElementRef, static: false }) inputCidrConverter: ElementRef;
  @ViewChild('outputCidrConverter', { read: ElementRef, static: false }) outputCidrConverter: ElementRef;
  @ViewChild('outputCidrConverterWildcard', { read: ElementRef, static: false }) outputCidrConverterWildcard: ElementRef;
  @ViewChild('inputMaskConverter', { read: ElementRef, static: false }) inputMaskConverter: ElementRef;
  @ViewChild('outputMaskConverter', { read: ElementRef, static: false }) outputMaskConverter: ElementRef;
  @ViewChild('outputMaskConverterWildcard', { read: ElementRef, static: false }) outputMaskConverterWildcard: ElementRef;
  @ViewChild('outputSubnetCalculatorTotalHosts', { read: ElementRef, static: false }) outputSubnetCalculatorTotalHosts: ElementRef;
  @ViewChild('outputSubnetCalculatorUsableHosts', { read: ElementRef, static: false }) outputSubnetCalculatorUsableHosts: ElementRef;

  private showSubnetResults: any;
  private showDetailButton = false;

  keyboardStyle = { width: '100%', height: '0px' };

  constructor(public toastController: ToastController, private networkService: NetworkService, private keyboard: Keyboard, public alertController: AlertController, private screenOrientation: ScreenOrientation) {

    // this.keyboard.onKeyboardWillShow().subscribe( {
    //   next: x => {
    //     this.keyboardStyle.height = x.keyboardHeight + 'px';
    //   },
    //   error: e => {
    //     console.log(e);
    //   }
    // });
    // this.keyboard.onKeyboardWillHide().subscribe( {
    //   next: x => {
    //     this.keyboardStyle.height = '0px';
    //   },
    //   error: e => {
    //     console.log(e);
    //   }
    // });

   }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {

  }

  ionViewDidLeave() {
    this.ClearInputs();
  }

  async createToast(msg: string) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'super-toast',
      keyboardClose: true,
    });
    toast.present();
  }

  async createAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['Close']
    });

    await alert.present();
  }

  ShowDetailBinary(){
    const binaryAddress = this.outputBinaryConverter.nativeElement.value;
    this.createAlert("Binary Address", binaryAddress);

  }

  // public focusInput (event): void {
  //   let total = 0;
  //   let container = null;

  //   const _rec = (obj) => {

  //       total += obj.offsetTop;
  //       const par = obj.offsetParent;
  //       if (par && par.localName !== 'ion-content') {
  //           _rec(par);
  //       } else {
  //           container = par;
  //       }
  //   };
  //   _rec(event.target);
  //   setTimeout(() => {
  //     container.scrollToPoint(0, total - 50, 400);
  //   }, 500);
  // }

  CloseKeyboard(){
    this.keyboard.hide();
  }

  ClearInputs() {
    this.ClearCalculateSubnet();
    this.ClearConvert2Binary();
    this.ClearConvertCidr2Netmask();
    this.ClearConvertNetmask2Cidr();
  }

  ClearCalculateSubnet() {
    this.inputSubnetCalculatorAddress.nativeElement.value = '';
    this.inputSubnetCalculatorCidr.nativeElement.value = '';
    this.outputSubnetCalculatorNetmask.nativeElement.value = '';
    this.outputSubnetCalculatorWildcard.nativeElement.value = '';
    this.outputSubnetCalculatorNetwork.nativeElement.value = '';
    this.outputSubnetCalculatorBroadcast.nativeElement.value = '';
    this.outputSubnetCalculatorMinHosts.nativeElement.value = '';
    this.outputSubnetCalculatorMaxHosts.nativeElement.value = '';
    this.outputSubnetCalculatorTotalHosts.nativeElement.value = '';
    this.outputSubnetCalculatorUsableHosts.nativeElement.value = '';
    this.showSubnetResults = false;
  }

  ClearConvert2Binary() {
    this.inputBinaryConverter.nativeElement.value = '';
    this.outputBinaryConverter.nativeElement.value = '';
    this.showDetailButton = false;
  }

  ClearConvertCidr2Netmask() {
    this.inputCidrConverter.nativeElement.value = '';
    this.outputCidrConverter.nativeElement.value = '';
    this.outputCidrConverterWildcard.nativeElement.value = '';
  }

  ClearConvertNetmask2Cidr() {
    this.inputMaskConverter.nativeElement.value = '';
    this.outputMaskConverter.nativeElement.value = '';
    this.outputMaskConverterWildcard.nativeElement.value = '';
  }

  CalculateSubnet() {
    const inputAddress = this.inputSubnetCalculatorAddress.nativeElement.value;
    const inputCidr = this.inputSubnetCalculatorCidr.nativeElement.value;
    if (!this.ValidateIpAddress(inputAddress)) {
      this.createToast("You have entered an invalid IP address!");
    } else if (!this.ValidateCidr(inputCidr)) {
      this.createToast("You have entered an invalid CIDR!");
    } else {
      this.showSubnetResults = true;
      const ipAddress = inputAddress.split('.');
      const subnet = this.networkService.getSubnetByCidr(inputCidr);
      const addresses = subnet.addresses;
      const hosts = subnet.hosts;
      const netmask = subnet.netmask.split('.').map(function (el) { return parseInt(el, 10) });
      const invertedNetmask = subnet.wildcard.split('.').map(function (el) { return parseInt(el, 10) });
      const baseAddress = ipAddress.map(function (block, idx) { return block & netmask[idx]; });
      const broadcastAddress = baseAddress.map(function (block, idx) { return block | invertedNetmask[idx]; });
      var firstHostAddress = [];
      var lastHostAddress = [];
      for (var i = 0; i < baseAddress.length; i++) {
        if (i == 3) {
          firstHostAddress.push((-(~baseAddress[i])));
          lastHostAddress.push((broadcastAddress[i] << 1) + (~broadcastAddress[i]));
        } else {
          firstHostAddress.push(baseAddress[i]);
          lastHostAddress.push(broadcastAddress[i]);
        }
      }

      this.outputSubnetCalculatorNetmask.nativeElement.value = netmask.join('.');
      this.outputSubnetCalculatorWildcard.nativeElement.value = invertedNetmask.join('.');
      this.outputSubnetCalculatorNetwork.nativeElement.value = baseAddress.join('.');
      this.outputSubnetCalculatorBroadcast.nativeElement.value = broadcastAddress.join('.');
      this.outputSubnetCalculatorMinHosts.nativeElement.value = firstHostAddress.join('.');
      this.outputSubnetCalculatorMaxHosts.nativeElement.value = lastHostAddress.join('.');
      this.outputSubnetCalculatorTotalHosts.nativeElement.value = addresses.toLocaleString();
      this.outputSubnetCalculatorUsableHosts.nativeElement.value = hosts.toLocaleString();
    }

  }

  Convert2Binary() {
    const inputAddress = this.inputBinaryConverter.nativeElement.value;
    if (this.ValidateIpAddress(inputAddress)) {
      const octects = inputAddress.split('.');
      const binaryOctects = octects.map(function (el) {
        let binaryEl = parseInt(el).toString(2);
        for (var i = binaryEl.length; i < 8; i++) {
          binaryEl = '0' + binaryEl;
        }
        return binaryEl;
      });
      const binaryAddress = binaryOctects.join('.');
      this.outputBinaryConverter.nativeElement.value = binaryAddress;
      if (this.screenOrientation.type == 'portrait-primary'){
        this.showDetailButton = true;
      };
    } else {
      this.createToast("You have entered an invalid IP address!");
    }
  }

  ConvertCidr2Netmask() {
    const inputCidr = this.inputCidrConverter.nativeElement.value;
    if (this.ValidateCidr(inputCidr)) {
      const subnet = this.networkService.getSubnetByCidr(inputCidr);
      this.outputCidrConverter.nativeElement.value = subnet.netmask;
      this.outputCidrConverterWildcard.nativeElement.value = subnet.wildcard;
    } else {
      this.createToast("You have entered an invalid CIDR!");
    }
  }

  ConvertNetmask2Cidr() {
    const inputAddress = this.inputMaskConverter.nativeElement.value;
    if (this.ValidateNetMask(inputAddress)) {
      const subnet = this.networkService.getSubnetByNetmask(inputAddress);
      this.outputMaskConverter.nativeElement.value = subnet.cidr;
      this.outputMaskConverterWildcard.nativeElement.value = subnet.wildcard;
    } else {
      this.createToast("You have entered an invalid Subnet Mask!");
    }
  }

  ValidateCidr(cidr) {
    if (/^(\/([0-9]|[1-2][0-9]|3[0-2]))$/.test(cidr)) {
      return (true)
    }
    return (false)
  }

  ValidateIpAddress(ipAddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
      return (true)
    }
    return (false)
  }

  ValidateNetMask(ipAddress) {
    if (/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/.test(ipAddress)) {
      return (true)
    }
    return (false)
  }
}
