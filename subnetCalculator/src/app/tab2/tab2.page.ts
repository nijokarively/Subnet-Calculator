import { Component } from '@angular/core';
import { NetworkService } from '../services/network-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private subnets: any;
  private classRanges: any;
  private reservedRanges: any;

  constructor(private networkService: NetworkService, private screenOrientation: ScreenOrientation) { }

  ionViewWillEnter() {
    // set to landscape
    this.screenOrientation.unlock();
    this.subnets = this.networkService.getCidrSubnets().reverse();
    this.classRanges = this.networkService.getClassRanges();
    this.reservedRanges = this.networkService.getReservedRanges();
  }

  ionViewDidEnter() {

  }

  ionViewDidLeave() {
    
  }

}
