import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'category-page',
  templateUrl: 'categories.html'
})
export class Categories {
  data: any;
  categories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.data = navParams.get('posts');
    this.initializeItems();

  }

  initializeItems(){
    this.categories = this.data;
  };


}
