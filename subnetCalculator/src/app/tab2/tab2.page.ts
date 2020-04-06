import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NetworkService } from '../services/network-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private subnets: any;
  private classRanges: any;
  private reservedRanges: any;

  constructor(public toastController: ToastController, private networkService: NetworkService) { }

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

  ionViewWillEnter() {
    this.createToast('Rotate your screen if data gets cut off');
    this.subnets = this.networkService.getCidrSubnets();
    this.classRanges = this.networkService.getClassRanges();
    this.reservedRanges = this.networkService.getReservedRanges();
  }

  ionViewDidEnter() {

  }

  ionViewDidLeave() {
  }

}
