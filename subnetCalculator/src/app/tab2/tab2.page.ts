import { Component } from '@angular/core';
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

  constructor(private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.subnets = this.networkService.getCidrSubnets().reverse();
    this.classRanges = this.networkService.getClassRanges();
    this.reservedRanges = this.networkService.getReservedRanges();
  }

  ionViewDidEnter() {

  }

  ionViewDidLeave() {

  }

}
