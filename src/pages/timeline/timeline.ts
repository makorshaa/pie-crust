import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'timeline-page',
  templateUrl: 'timeline.html'
})
export class Timeline {
  data: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.data = navParams.get('posts');

  }


}
