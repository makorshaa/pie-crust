import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-subscribe',
    templateUrl: 'subscribe.html'
  })

  export class SubscribePage {
    post: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
      events.publish('hideHeader', { isHidden: true});
    }
    ionViewWillLeave() {
      //Make footer visiable while leaving the page.
      this.events.publish('hideHeader', { isHidden: false});
  }

    ionViewDidLoad() {
    }
      close(){
this.navCtrl.pop();
      }
  }
