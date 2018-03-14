import { Component, ViewChild} from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PostService } from '../../providers/ghost-service/ghost-service';
import { Post } from '../../providers/ghost-service/ghost-service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'page-post',
    templateUrl: 'pagedetail.html'
  })

  export class PostDetailPage {
  html: SafeHtml;

    @ViewChild(Nav) nav: Nav;

    post: any;
    posts:Post[];

    constructor(private domSanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams, public postService:PostService, public events: Events) {
      this.getData();
      this.posts = [];
      events.publish('hideHeader', { isHidden: true});
    }

    ionViewWillLeave() {
      //Make footer visiable while leaving the page.
      this.events.publish('hideHeader', { isHidden: false});
  }

    ionViewDidLoad() {
    }

    getData(){
      this.post = this.navParams.data;
      this.html=this.domSanitizer.bypassSecurityTrustHtml(this.post.html)
    }

    openPage(page){
        if(page==='home'){
          this.nav.goToRoot;
        }
      }
  }
