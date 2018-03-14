import { Component, ViewChild, forwardRef } from '@angular/core';
import { Nav, Platform, NavController, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PostService} from '../providers/ghost-service/ghost-service';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { SplashPage } from '../pages/splash/splash';
import { MenuController } from 'ionic-angular';
import { CategoryFilterPage } from '../pages/filterCategory/filterCategory';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './app.html'
})
export class MyApp {
  updated_dataItmes: any[];
  listedMonthsForThisYear: any[];
  updated_publishlist: any;
  publishlist: any;
  cardItemsByMonth: any[];
  specificCategoryItems: any[];
  getalldata: any[];
  monthList: any;
  categorylist: any[];

  @ViewChild(forwardRef(() => HomePage)) home: HomePage;
  @ViewChild(Nav) nav: Nav;
  @ViewChild(NavController) navCtrl: NavController
  rootPage: any = LoginPage;
  dataItmes: any;
  yearList: any;
  calender: string[];
  tags: any;
  shownGroup = null;
  categories: any[];
  searchTerm: string = '';
  navbarIsHidden: boolean = true;
 

  constructor(public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public modalCtrl: ModalController, public splashScreen: SplashScreen, public postService: PostService, public datepipe: DatePipe, public events: Events) {
    // this.splashScreen.show();
    this.initializeApp();
   this.initializeItems();
    this.getCategories(); 
    events.subscribe('hideHeader', (data) => {
      this.navbarIsHidden = data.isHidden;
  })

  
  }
  ionViewDidLoad() {
    this.setFilteredItems();
  }

  //searchbar filter in menu
  setFilteredItems() {
    if (this.searchTerm == null || this.searchTerm == "" || this.searchTerm == undefined) {
      this.categories = this.categorylist;
    }
    this.categories = this.filterItems(this.searchTerm);

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      let splash = this.modalCtrl.create(SplashPage);
      splash.present();
    });
  }

  initializeMenuItems() {
    //categoryList view in menu items
    this.tags.forEach((eachObj, index) => {
      this.categories[index] = { 'name': eachObj.name, 'id': eachObj.id };
    });
    this.categorylist = this.categories;

    //yearList view in menu items
    this.monthsInYear();

  }

  //TIMELINE section-------
  //get a list of article published dates in proper format after removing duplicates

  monthsInYear() {
    this.publishlist = [];
    this.updated_publishlist = [];
    Object.keys(this.dataItmes).forEach(key => {
      let publishdate = this.dataItmes[key].published_at;
      let latest_date = this.datepipe.transform(publishdate, 'yyyy-MMMM-dd');
      let str1 = latest_date.split('-');
      let month = str1[1];
      let year = str1[0];
      this.publishlist.push({ 'month': month, 'year': year });
    });
    var dedup = this.dedup(this.publishlist);
    let outputMap = new Map();
    for (var i in dedup) {
      let year = dedup[i].year;
      let month = dedup[i].month;
      let months = outputMap.get(year);
      if (null != months) {
        outputMap.set(year, months + "," + month);
      }
      else {
        outputMap.set(year, month);
      }
    }
    this.logMapElements(outputMap);
  }

  //get list of article published year and its corresponding months for particular year
  logMapElements(map) {
    var iterator = map.entries();
    this.updated_publishlist = [];
    for (let index = 0; index < map.size; index++) {
      let values = iterator.next().value;
      this.updated_publishlist.push({ 'year': values[0], 'months': values[1] });

    }
  }

  //display article published months for the specific year clicked
  getmonths(item) {
    this.listedMonthsForThisYear = [];
    let monthlist = item.months.split(',');
    for (let month of monthlist) {
      this.listedMonthsForThisYear.push(month);
    }
  }

  //remove duplictes from monthsInYear
  dedup(arr) {
    var hashTable = {};

    return arr.filter(function (el) {
      var key = JSON.stringify(el);
      var match = Boolean(hashTable[key]);

      return (match ? false : hashTable[key] = true);
    });
  }

  //filter search
  filterItems(searchTerm) {
    return this.categories.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  openPage(page: string) {
    if (page === 'home') {
      this.nav.setRoot(HomePage);
    }
    else if (page === 'subscribe') {
      this.nav.push(SubscribePage);
    }

  }

  //service call to get all posts
  getCategories() {
    this.categories = [];
    this.postService.getTags().subscribe((data) => {
      this.tags = data;
    });

  }

  //service call to get all posts
  initializeItems() {
    this.yearList = [];
    this.monthList = [];
    this.dataItmes = [];
    this.postService.getPost().subscribe((data) => {
      this.dataItmes = data;
    });
  }

  //service call for all posts
  showSelectedCategoryCards(id) {
    this.postService.getPost().subscribe((data) => {
      this.getalldata = data;
      this.specificCategoryItems = [];
      let i = 0;
      Object.keys(this.getalldata).forEach(key => {
        if (this.getalldata[key].primary_tag == null || this.getalldata[key].primary_tag == undefined) {
          this.getalldata[key].primary_tag = { 'id': "" };
        }
        if (id == this.getalldata[key].primary_tag.id) {
          this.specificCategoryItems[i] = this.getalldata[key];
          i++;
        }

      });
      this.sendAllPost();
      this.menuCtrl.close();
    });
  }

  //on clicking month
  showCardsByMonth(year, month) {
    this.updated_dataItmes = [];
    for (let data of this.dataItmes) {
      let pub_date = data.published_at;
      let ldate = this.datepipe.transform(pub_date, 'yyyy-MMMM-dd');
      let str1 = ldate.split('-');
      if (str1[1] == month && str1[0] == year) {
        this.updated_dataItmes.push(data);
      }
    }
    this.sendAllItems();
    this.menuCtrl.close();
  }

  sendAllPost() {
    this.nav.push(CategoryFilterPage, this.specificCategoryItems);
  }

  sendAllItems() {
    this.nav.push(CategoryFilterPage, this.updated_dataItmes);
  }
}
