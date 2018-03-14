import { Component,ViewChild} from '@angular/core';
import { Nav, NavController,NavParams } from 'ionic-angular';
import { PostService } from '../../providers/ghost-service/ghost-service';
import { PostDetailPage } from '../posts/postdetail';

@Component({
  selector: 'filter-home',
  templateUrl: 'filterCategory.html'
})
export class CategoryFilterPage {
  posts: any;
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,public navParams: NavParams, public postService: PostService) {
    this.posts=[];
    this.getData();
  }

  getData() {
      this.posts = this.navParams.data;
      Object.keys(this.posts).forEach(key => {
        if (this.posts[key].primary_tag != null || this.posts[key].primary_tag != undefined) {
          this.posts[key].category = this.posts[key].primary_tag.name;
        }
        else {
          this.posts[key].category = "";
        }
        if (this.posts[key].author.profile_image == null) {
          this.posts[key].author.profile_image = 'https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-128.png';
        }
        else {
          this.posts[key].author.profile_image = 'http://localhost:2368/' + this.posts[key].author.profile_image;
        }
        if (this.posts[key].feature_image == "" || this.posts[key].feature_image == null || this.posts[key].feature_image == undefined) {
          this.posts[key].feature_image = 'http://via.placeholder.com/80x80';
        }
      });



  }

  openCard(post) {
    // this.nav.setRoot(PostDetailPage);
    this.navCtrl.push(PostDetailPage, post);
  }

}
