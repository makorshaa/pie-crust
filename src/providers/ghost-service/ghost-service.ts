import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ghost } from 'ghost-cli';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the GhostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Post {
  constructor(public id: string,
    public uuid: string,
    public title: string,
    public slug: string,
    public html: string,
    public feature_image: string,
    public featured: boolean,
    public page: boolean,
    public status: string,
    public locale: string,
    public visibility: string,
    public meta_title: string,
    public meta_description: string,
    public created_at: string,
    public created_by: string,
    public updated_at: string,
    public updated_by: string,
    public published_at: string,
    public published_by: string,
    public custom_excerpt: string,
    public codeinjection_head: string,
    public codeinjection_foot: string,
    public og_image: string,
    public og_title: string,
    public og_description: string,
    public twitter_image: string,
    public twitter_title: string,
    public twitter_description: string,
    public custom_template: string,
    public author: string,
    public primary_tag: string,
    public url: string,
    public comment_id: string
  ) {
  }
}

@Injectable()
export class GhostServiceProvider {

  private _isLoading = new BehaviorSubject<Object>(false);
  public isLoading = this._isLoading.asObservable();

  constructor(public http: HttpClient) {
    console.log('Hello GhostServiceProvider Provider');

  }

  public setLoading(isLoading: boolean, group: any = null) {
    this._isLoading.next({
      isLoading: isLoading,
      group: group
    })
  }


}
@Injectable()
export class PostService {
  url: string;
  error: any;
  tagdata: any;
  urlTag: string;
  apiRoot: string = 'http://localhost:2368/ghost/api/v0.1/';
  posts: Post[];
  loading: boolean;

  constructor(private http: Http) {
    this.posts = [];
    this.loading = false;
  }

  //service call to get all data posted
  getPost(): Observable<Post[]> {

    let apiURL = `${this.apiRoot}posts/?limit=all&include=tags%2Cauthor&client_id=ghost-frontend&client_secret=7a7ab2a6cf44`;
    return this.http.get(apiURL).map(
      res => {
        return res.json().posts.map(item => {
          return new Post(
            item.id,
            item.uuid,
            item.title,
            item.slug,
            item.html,
            item.feature_image,
            item.featured,
            item.page,
            item.status,
            item.locale,
            item.visibility,
            item.meta_title,
            item.meta_description,
            item.created_at,
            item.created_by,
            item.updated_at,
            item.updated_by,
            item.published_at,
            item.published_by,
            item.custom_excerpt,
            item.codeinjection_head,
            item.codeinjection_foot,
            item.og_image,
            item.og_title,
            item.og_description,
            item.twitter_image,
            item.twitter_title,
            item.twitter_description,
            item.custom_template,
            item.author,
            item.primary_tag,
            item.url,
            item.comment_id
          );
        });
      });
  }

//service call to get all tags
  getTags() {
    this.urlTag = `${this.apiRoot}tags/?limit=all&include=count.posts&order=count.posts%20ASC&client_id=ghost-frontend&client_secret=7a7ab2a6cf44`;

    return this.http.get(this.urlTag).map(
      res => {
        res = res.json().tags;
        return res;

      });

  }

//service call to get all published posts
  getPublishedPosts() {
    this.url = `${this.apiRoot}posts/?limit=all&client_id=ghost-frontend&client_secret=7a7ab2a6cf44`;

    return this.http.get(this.url).map(
      res => {
        res = res.json().posts;
        return res;

      });

  }
}
