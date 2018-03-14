import { Component } from '@angular/core';
import { NavController, NavParams, Events  } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public events: Events) {
    this.user = this.formBuilder.group({
     username:[''],
     password:['']
    });
    events.publish('hideHeader', { isHidden: true});
  }

  ionViewWillLeave() {
    //Make footer visiable while leaving the page.
    this.events.publish('hideHeader', { isHidden: false});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.user.value);
    this.navCtrl.setRoot(HomePage);
  }

}
