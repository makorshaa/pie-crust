webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_postdetail__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ghost_service_ghost_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__subscribe_subscribe__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filterCategory_filterCategory__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    function HomePage(navCtrl, postService, menuCtrl, platform, statusBar, modalCtrl, datepipe) {
        this.navCtrl = navCtrl;
        this.postService = postService;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.modalCtrl = modalCtrl;
        this.datepipe = datepipe;
        this.shownGroup = null;
        this.searchTerm = '';
        this.message = "Hola Mundo!";
        this.getData();
        this.initializeItems();
        this.getCategories();
    }
    HomePage_1 = HomePage;
    HomePage.prototype.getData = function () {
        var _this = this;
        this.postService.getPost().subscribe(function (data) {
            _this.posts = data;
            Object.keys(_this.posts).forEach(function (key) {
                if (_this.posts[key].primary_tag != null || _this.posts[key].primary_tag != undefined) {
                    _this.posts[key].category = _this.posts[key].primary_tag.name;
                }
                else {
                    _this.posts[key].category = "";
                }
                if (_this.posts[key].author.profile_image == null) {
                    _this.posts[key].author.profile_image = 'https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-128.png';
                }
                else {
                    _this.posts[key].author.profile_image = 'http://localhost:2368/' + _this.posts[key].author.profile_image;
                }
                if (_this.posts[key].feature_image == "" || _this.posts[key].feature_image == null || _this.posts[key].feature_image == undefined) {
                    _this.posts[key].feature_image = 'http://via.placeholder.com/80x80';
                }
            });
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.setFilteredItems();
    };
    //searchbar filter in menu
    HomePage.prototype.setFilteredItems = function () {
        if (this.searchTerm == null || this.searchTerm == "" || this.searchTerm == undefined) {
            this.categories = this.categorylist;
        }
        else {
            console.log(this.searchTerm);
            this.categories = this.filterItems(this.searchTerm);
        }
    };
    //TIMELINE section-------
    //get a list of article published dates in proper format after removing duplicates
    HomePage.prototype.monthsInYear = function () {
        var _this = this;
        this.publishlist = [];
        this.updated_publishlist = [];
        Object.keys(this.dataItmes).forEach(function (key) {
            var publishdate = _this.dataItmes[key].published_at;
            var latest_date = _this.datepipe.transform(publishdate, 'yyyy-MMMM-dd');
            var str1 = latest_date.split('-');
            var month = str1[1];
            var year = str1[0];
            _this.publishlist.push({ 'month': month, 'year': year });
        });
        var dedup = this.dedup(this.publishlist);
        var outputMap = new Map();
        for (var i in dedup) {
            var year = dedup[i].year;
            var month = dedup[i].month;
            var months = outputMap.get(year);
            if (null != months) {
                outputMap.set(year, months + "," + month);
            }
            else {
                outputMap.set(year, month);
            }
        }
        this.logMapElements(outputMap);
    };
    //get list of article published year and its corresponding months for particular year
    HomePage.prototype.logMapElements = function (map) {
        var iterator = map.entries();
        this.updated_publishlist = [];
        for (var index = 0; index < map.size; index++) {
            var values = iterator.next().value;
            this.updated_publishlist.push({ 'year': values[0], 'months': values[1] });
        }
    };
    //display article published months for the specific year clicked
    HomePage.prototype.getmonths = function (item) {
        this.listedMonthsForThisYear = [];
        var monthlist = item.months.split(',');
        for (var _i = 0, monthlist_1 = monthlist; _i < monthlist_1.length; _i++) {
            var month = monthlist_1[_i];
            this.listedMonthsForThisYear.push(month);
        }
    };
    //remove duplictes from monthsInYear
    HomePage.prototype.dedup = function (arr) {
        var hashTable = {};
        return arr.filter(function (el) {
            var key = JSON.stringify(el);
            var match = Boolean(hashTable[key]);
            return (match ? false : hashTable[key] = true);
        });
    };
    //filter search
    HomePage.prototype.filterItems = function (searchTerm) {
        return this.categories.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    HomePage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    HomePage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    HomePage.prototype.openPage = function (page) {
        if (page === 'home') {
            this.nav.setRoot(HomePage_1);
        }
        else if (page === 'subscribe') {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_6__subscribe_subscribe__["a" /* SubscribePage */]);
        }
    };
    //service call to get all posts
    HomePage.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.postService.getTags().subscribe(function (data) {
            _this.tags = data;
            console.log(_this.tags);
        });
    };
    HomePage.prototype.initializeMenuItems = function () {
        var _this = this;
        this.categories = [];
        console.log(this.tags);
        //categoryList view in menu items
        this.tags.forEach(function (eachObj, index) {
            _this.categories[index] = { 'name': eachObj.name, 'id': eachObj.id };
        });
        this.categorylist = this.categories;
        //yearList view in menu items
        this.monthsInYear();
    };
    //service call to get all posts
    HomePage.prototype.initializeItems = function () {
        var _this = this;
        this.yearList = [];
        this.monthList = [];
        this.dataItmes = [];
        this.postService.getPost().subscribe(function (data) {
            _this.dataItmes = data;
        });
    };
    //service call for all posts
    HomePage.prototype.showSelectedCategoryCards = function (id) {
        var _this = this;
        this.postService.getPost().subscribe(function (data) {
            _this.getalldata = data;
            _this.specificCategoryItems = [];
            var i = 0;
            Object.keys(_this.getalldata).forEach(function (key) {
                if (_this.getalldata[key].primary_tag == null || _this.getalldata[key].primary_tag == undefined) {
                    _this.getalldata[key].primary_tag = { 'id': "" };
                }
                if (id == _this.getalldata[key].primary_tag.id) {
                    _this.specificCategoryItems[i] = _this.getalldata[key];
                    i++;
                }
            });
            _this.sendAllPost();
            _this.menuCtrl.close();
        });
    };
    //on clicking month
    HomePage.prototype.showCardsByMonth = function (year, month) {
        this.updated_dataItmes = [];
        for (var _i = 0, _a = this.dataItmes; _i < _a.length; _i++) {
            var data = _a[_i];
            var pub_date = data.published_at;
            var ldate = this.datepipe.transform(pub_date, 'yyyy-MMMM-dd');
            var str1 = ldate.split('-');
            if (str1[1] == month && str1[0] == year) {
                this.updated_dataItmes.push(data);
            }
        }
        this.sendAllItems();
        this.menuCtrl.close();
    };
    HomePage.prototype.sendAllPost = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__filterCategory_filterCategory__["a" /* CategoryFilterPage */], this.specificCategoryItems);
    };
    HomePage.prototype.sendAllItems = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__filterCategory_filterCategory__["a" /* CategoryFilterPage */], this.updated_dataItmes);
    };
    //Open any particular post in details
    HomePage.prototype.openCard = function (post) {
        // this.nav.setRoot(PostDetailPage);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__posts_postdetail__["a" /* PostDetailPage */], post);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
    ], HomePage.prototype, "nav", void 0);
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\home\home.html"*/'<ion-content>\n\n  <!-- Segment buttons with text -->\n\n  <ion-segment [(ngModel)]="selectedSegment" color="primary">\n\n      <ion-segment-button value="articles" (ionSelect)="selectedArticles()">\n\n        Articles\n\n      </ion-segment-button>\n\n      <ion-segment-button value="videos" (ionSelect)="selectedVideos()">\n\n        Videos\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  <ion-card *ngFor="let post of posts" (click)="openCard(post)">\n\n    <ion-card-content>\n\n      <!-- dimensions set using attributes -->\n\n      <div class="post-image">\n\n        <img style="width: 100%; height : 165px;" src="{{post.feature_image}}" />\n\n        <div class="post-image-title">{{post.category}}</div>\n\n      </div>\n\n      <ion-card-title>\n\n        <b>{{post.title}}</b>\n\n      </ion-card-title>\n\n      <div style="text-align:end;">\n\n        <p class="date">{{post.published_at | date : \'MMM d, y\' }}&nbsp;{{post.published_at | date : \'h:mm a\' }}</p>\n\n      </div>\n\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_ghost_service_ghost_service__["b" /* PostService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ghost_service_ghost_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostDetailPage = (function () {
    function PostDetailPage(domSanitizer, navCtrl, navParams, postService, events) {
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postService = postService;
        this.events = events;
        this.getData();
        this.posts = [];
        events.publish('hideHeader', { isHidden: true });
    }
    PostDetailPage.prototype.ionViewWillLeave = function () {
        //Make footer visiable while leaving the page.
        this.events.publish('hideHeader', { isHidden: false });
    };
    PostDetailPage.prototype.ionViewDidLoad = function () {
    };
    PostDetailPage.prototype.getData = function () {
        this.post = this.navParams.data;
        this.html = this.domSanitizer.bypassSecurityTrustHtml(this.post.html);
    };
    PostDetailPage.prototype.openPage = function (page) {
        if (page === 'home') {
            this.nav.goToRoot;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], PostDetailPage.prototype, "nav", void 0);
    PostDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-post',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\posts\pagedetail.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-title style="text-transform: uppercase;">\n\n          {{post.category}}\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button>\n\n              <ion-icon name="logo-facebook" class="custom-icon facebook"></ion-icon>\n\n            </button>\n\n            <button ion-button>\n\n                <ion-icon name="logo-twitter" class="custom-icon twitter"></ion-icon>\n\n              </button>\n\n          </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h2> {{post.title}}</h2>\n\n  <ion-img height="40%" width="100%" src="{{post.feature_image}}"></ion-img>\n\n  <div [innerHTML]="html"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\posts\pagedetail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_ghost_service_ghost_service__["b" /* PostService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
    ], PostDetailPage);
    return PostDetailPage;
}());

//# sourceMappingURL=postdetail.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscribePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SubscribePage = (function () {
    function SubscribePage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        events.publish('hideHeader', { isHidden: true });
    }
    SubscribePage.prototype.ionViewWillLeave = function () {
        //Make footer visiable while leaving the page.
        this.events.publish('hideHeader', { isHidden: false });
    };
    SubscribePage.prototype.ionViewDidLoad = function () {
    };
    SubscribePage.prototype.close = function () {
        this.navCtrl.pop();
    };
    SubscribePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-subscribe',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\subscribe\subscribe.html"*/'\n\n<ion-content padding class="subs-page">\n\n                <ion-icon name="close" class="close-icon" (click) = "close()"></ion-icon>\n\n                <br><br><br><br><br><br><br><br><br><br><br><br>\n\n    <ion-list style="text-align: center; vertical-align: middle">\n\n        <h2>Subscribe to Profit In Equities</h2>\n\n        <br>\n\n        <ion-item>\n\n        <ion-input type="email" placeholder="youremail@example.com"></ion-input>\n\n        </ion-item>\n\n        <br>\n\n        <button ion-button round small class="subscribe-fill-button" >Subscribe</button>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\subscribe\subscribe.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
    ], SubscribePage);
    return SubscribePage;
}());

//# sourceMappingURL=subscribe.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ghost_service_ghost_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__posts_postdetail__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CategoryFilterPage = (function () {
    function CategoryFilterPage(navCtrl, navParams, postService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postService = postService;
        this.posts = [];
        this.getData();
    }
    CategoryFilterPage.prototype.getData = function () {
        var _this = this;
        this.posts = this.navParams.data;
        Object.keys(this.posts).forEach(function (key) {
            if (_this.posts[key].primary_tag != null || _this.posts[key].primary_tag != undefined) {
                _this.posts[key].category = _this.posts[key].primary_tag.name;
            }
            else {
                _this.posts[key].category = "";
            }
            if (_this.posts[key].author.profile_image == null) {
                _this.posts[key].author.profile_image = 'https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-circle-128.png';
            }
            else {
                _this.posts[key].author.profile_image = 'http://localhost:2368/' + _this.posts[key].author.profile_image;
            }
            if (_this.posts[key].feature_image == "" || _this.posts[key].feature_image == null || _this.posts[key].feature_image == undefined) {
                _this.posts[key].feature_image = 'http://via.placeholder.com/80x80';
            }
        });
    };
    CategoryFilterPage.prototype.openCard = function (post) {
        // this.nav.setRoot(PostDetailPage);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__posts_postdetail__["a" /* PostDetailPage */], post);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], CategoryFilterPage.prototype, "nav", void 0);
    CategoryFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'filter-home',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\filterCategory\filterCategory.html"*/'<ion-content>\n\n  <ion-card *ngFor="let post of posts" (click)="openCard(post)">\n\n\n\n\n\n      <ion-card-content>\n\n          <!-- dimensions set using attributes -->\n\n          <div class="post-image">\n\n            <img style="width: 100%; height : 165px;" src="{{post.feature_image}}" />\n\n            <div class="post-image-title">{{post.category}}</div>\n\n          </div>\n\n          <ion-card-title>\n\n            <b>{{post.title}}</b>\n\n          </ion-card-title>\n\n          <div style="text-align:end;">\n\n            <p class="date">{{post.published_at | date : \'MMM d, y\' }}&nbsp;{{post.published_at | date : \'h:mm a\' }}</p>\n\n          </div>\n\n        </ion-card-content>\n\n\n\n  </ion-card>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\filterCategory\filterCategory.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_ghost_service_ghost_service__["b" /* PostService */]])
    ], CategoryFilterPage);
    return CategoryFilterPage;
}());

//# sourceMappingURL=filterCategory.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.events = events;
        this.user = this.formBuilder.group({
            username: [''],
            password: ['']
        });
        events.publish('hideHeader', { isHidden: true });
    }
    LoginPage.prototype.ionViewWillLeave = function () {
        //Make footer visiable while leaving the page.
        this.events.publish('hideHeader', { isHidden: false });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        console.log(this.user.value);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Profit In Equities</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding margin-top>\n\n  <form [formGroup]="user" class="login-form" (ngSubmit)="login()">\n\n    <ion-item>\n\n      <ion-label>Username</ion-label>\n\n      <ion-input type="text" formControlName="username"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Password</ion-label>\n\n      <ion-input type="password" formControlName="password"></ion-input>\n\n    </ion-item>\n\n    <br>\n\n    <ion-item class="login-button-wrapper">\n\n      <button ion-button type="submit" class="login-button">Login</button>\n\n    </ion-item>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SplashPage = (function () {
    function SplashPage(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SplashPage');
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\splash\splash.html"*/'<!--\n\n  Generated template for the SplashPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding class="subs-page">\n\n  <ion-item class="load-middle">\n\n      <img src="./assets/imgs/bull-logo-green.png" alt="" />\n\n    <h1>Profit In Equities</h1>\n\n    <h6>Read, Learn and Profit</h6>\n\n  </ion-item>\n\n  <!-- <br><br><br><br><br><br><br><br><br><br><br><br>\n\n<ion-list style="text-align: center; vertical-align: middle"> -->\n\n\n\n\n\n<!-- </ion-list> -->\n\n</ion-content>'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_posts_postdetail__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_ghost_ghost__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_subscribe_subscribe__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_splash_splash__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_ghost_service_ghost_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__utilityService__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_filterCategory_filterCategory__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_posts_postdetail__["a" /* PostDetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__components_ghost_ghost__["a" /* GhostComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_subscribe_subscribe__["a" /* SubscribePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_filterCategory_filterCategory__["a" /* CategoryFilterPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_posts_postdetail__["a" /* PostDetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__components_ghost_ghost__["a" /* GhostComponent */],
                __WEBPACK_IMPORTED_MODULE_9__pages_subscribe_subscribe__["a" /* SubscribePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_filterCategory_filterCategory__["a" /* CategoryFilterPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_ghost_service_ghost_service__["a" /* GhostServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_15__utilityService__["a" /* UtilityService */],
                __WEBPACK_IMPORTED_MODULE_14__providers_ghost_service_ghost_service__["b" /* PostService */],
                __WEBPACK_IMPORTED_MODULE_17__angular_common__["d" /* DatePipe */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ghost_service_ghost_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_subscribe_subscribe__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_filterCategory_filterCategory__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(menuCtrl, platform, statusBar, modalCtrl, splashScreen, postService, datepipe, events) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.modalCtrl = modalCtrl;
        this.splashScreen = splashScreen;
        this.postService = postService;
        this.datepipe = datepipe;
        this.events = events;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.shownGroup = null;
        this.searchTerm = '';
        this.navbarIsHidden = true;
        // this.splashScreen.show();
        this.initializeApp();
        this.initializeItems();
        this.getCategories();
        events.subscribe('hideHeader', function (data) {
            _this.navbarIsHidden = data.isHidden;
        });
    }
    MyApp.prototype.ionViewDidLoad = function () {
        this.setFilteredItems();
    };
    //searchbar filter in menu
    MyApp.prototype.setFilteredItems = function () {
        if (this.searchTerm == null || this.searchTerm == "" || this.searchTerm == undefined) {
            this.categories = this.categorylist;
        }
        this.categories = this.filterItems(this.searchTerm);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            var splash = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__["a" /* SplashPage */]);
            splash.present();
        });
    };
    MyApp.prototype.initializeMenuItems = function () {
        var _this = this;
        //categoryList view in menu items
        this.tags.forEach(function (eachObj, index) {
            _this.categories[index] = { 'name': eachObj.name, 'id': eachObj.id };
        });
        this.categorylist = this.categories;
        //yearList view in menu items
        this.monthsInYear();
    };
    //TIMELINE section-------
    //get a list of article published dates in proper format after removing duplicates
    MyApp.prototype.monthsInYear = function () {
        var _this = this;
        this.publishlist = [];
        this.updated_publishlist = [];
        Object.keys(this.dataItmes).forEach(function (key) {
            var publishdate = _this.dataItmes[key].published_at;
            var latest_date = _this.datepipe.transform(publishdate, 'yyyy-MMMM-dd');
            var str1 = latest_date.split('-');
            var month = str1[1];
            var year = str1[0];
            _this.publishlist.push({ 'month': month, 'year': year });
        });
        var dedup = this.dedup(this.publishlist);
        var outputMap = new Map();
        for (var i in dedup) {
            var year = dedup[i].year;
            var month = dedup[i].month;
            var months = outputMap.get(year);
            if (null != months) {
                outputMap.set(year, months + "," + month);
            }
            else {
                outputMap.set(year, month);
            }
        }
        this.logMapElements(outputMap);
    };
    //get list of article published year and its corresponding months for particular year
    MyApp.prototype.logMapElements = function (map) {
        var iterator = map.entries();
        this.updated_publishlist = [];
        for (var index = 0; index < map.size; index++) {
            var values = iterator.next().value;
            this.updated_publishlist.push({ 'year': values[0], 'months': values[1] });
        }
    };
    //display article published months for the specific year clicked
    MyApp.prototype.getmonths = function (item) {
        this.listedMonthsForThisYear = [];
        var monthlist = item.months.split(',');
        for (var _i = 0, monthlist_1 = monthlist; _i < monthlist_1.length; _i++) {
            var month = monthlist_1[_i];
            this.listedMonthsForThisYear.push(month);
        }
    };
    //remove duplictes from monthsInYear
    MyApp.prototype.dedup = function (arr) {
        var hashTable = {};
        return arr.filter(function (el) {
            var key = JSON.stringify(el);
            var match = Boolean(hashTable[key]);
            return (match ? false : hashTable[key] = true);
        });
    };
    //filter search
    MyApp.prototype.filterItems = function (searchTerm) {
        return this.categories.filter(function (item) {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    MyApp.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    MyApp.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    MyApp.prototype.openPage = function (page) {
        if (page === 'home') {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        }
        else if (page === 'subscribe') {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_subscribe_subscribe__["a" /* SubscribePage */]);
        }
    };
    //service call to get all posts
    MyApp.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.postService.getTags().subscribe(function (data) {
            _this.tags = data;
        });
    };
    //service call to get all posts
    MyApp.prototype.initializeItems = function () {
        var _this = this;
        this.yearList = [];
        this.monthList = [];
        this.dataItmes = [];
        this.postService.getPost().subscribe(function (data) {
            _this.dataItmes = data;
        });
    };
    //service call for all posts
    MyApp.prototype.showSelectedCategoryCards = function (id) {
        var _this = this;
        this.postService.getPost().subscribe(function (data) {
            _this.getalldata = data;
            _this.specificCategoryItems = [];
            var i = 0;
            Object.keys(_this.getalldata).forEach(function (key) {
                if (_this.getalldata[key].primary_tag == null || _this.getalldata[key].primary_tag == undefined) {
                    _this.getalldata[key].primary_tag = { 'id': "" };
                }
                if (id == _this.getalldata[key].primary_tag.id) {
                    _this.specificCategoryItems[i] = _this.getalldata[key];
                    i++;
                }
            });
            _this.sendAllPost();
            _this.menuCtrl.close();
        });
    };
    //on clicking month
    MyApp.prototype.showCardsByMonth = function (year, month) {
        this.updated_dataItmes = [];
        for (var _i = 0, _a = this.dataItmes; _i < _a.length; _i++) {
            var data = _a[_i];
            var pub_date = data.published_at;
            var ldate = this.datepipe.transform(pub_date, 'yyyy-MMMM-dd');
            var str1 = ldate.split('-');
            if (str1[1] == month && str1[0] == year) {
                this.updated_dataItmes.push(data);
            }
        }
        this.sendAllItems();
        this.menuCtrl.close();
    };
    MyApp.prototype.sendAllPost = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_filterCategory_filterCategory__["a" /* CategoryFilterPage */], this.specificCategoryItems);
    };
    MyApp.prototype.sendAllItems = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_filterCategory_filterCategory__["a" /* CategoryFilterPage */], this.updated_dataItmes);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]; })),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */])
    ], MyApp.prototype, "home", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Workspace\Working\pie\src\app\app.html"*/'\n\n<ion-header ion-fixed class="custom-toolbar" *ngIf="!navbarIsHidden" ng-click="clickfooter();">\n\n    <ion-toolbar>\n\n        <button ion-button menuToggle left class="icon-wrapper" (click)="initializeMenuItems()">\n\n            <ion-icon name="menu" class="custom-icon"></ion-icon>\n\n          </button>\n\n      <ion-buttons>\n\n        <button ion-button (click)="openPage(\'home\')" style="margin-right: 15px;" class="icon-wrapper">\n\n              <ion-icon name="md-home" class="footer-icon custom-icon"></ion-icon>\n\n            </button>\n\n        <a button ion-button style="margin-right: 15px;" class="icon-wrapper" href="https://www.youtube.com/channel/UC6A4PIESjI6czvt-GubM8FQ"\n\n          target="_blank">\n\n          <ion-icon name="logo-youtube" class="footer-icon custom-icon youtube"></ion-icon>\n\n        </a>\n\n        <a button ion-button style="margin-right: 15px;" class="icon-wrapper" href="https://www.facebook.com/ProfitInEquities" target="_blank">\n\n          <ion-icon name="logo-facebook" class="footer-icon custom-icon facebook"></ion-icon>\n\n        </a>\n\n        <a button ion-button style="margin-right: 15px;" class="icon-wrapper" href="https://twitter.com/ProfitInEquity" target="_blank">\n\n          <ion-icon name="logo-twitter" class="footer-icon custom-icon twitter"></ion-icon>\n\n        </a>\n\n        <button ion-button class="icon-wrapper" style="width: 29%" (click)="openPage(\'subscribe\')">\n\n              <button ion-button round outline small style="font-size: 79%;" class="subscribe-outline-button footer-icon">Subscribe</button>\n\n        </button>\n\n      </ion-buttons>\n\n      \n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-menu id="card-menu" class="card-menu" [content]="content" side="left" padding>\n\n      \n\n        <ion-content>\n\n          <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredItems()" placeholder="Search categories"></ion-searchbar>\n\n          <h6 class="title-center">CATEGORIES</h6>\n\n          <ion-list>\n\n            <ion-item *ngFor="let category of categories">\n\n              <button ion-item text-wrap (click)="showSelectedCategoryCards(category.id)"> {{ category.name}} </button>\n\n            </ion-item>\n\n          </ion-list>\n\n          <h6 class="title-center">TIMELINE</h6>\n\n          <div class="calender-align" *ngFor="let items of updated_publishlist; let i=index" text-wrap>\n\n            <ion-list>\n\n              <ion-item class="list-selector" (click)="toggleGroup(i);getmonths(items);" [ngClass]="{active: isGroupShown(i)}">\n\n                <h3>\n\n                  {{items.year}}\n\n                  <ion-icon item-right [name]="isGroupShown(i) ? \'arrow-dropdown\' : \'arrow-dropright\'"></ion-icon>\n\n                </h3>\n\n              </ion-item>\n\n            </ion-list>\n\n            <div *ngIf="isGroupShown(i)">\n\n              <ion-list>\n\n                <ion-item *ngFor="let month of listedMonthsForThisYear">\n\n                  <button ion-item (click)="showCardsByMonth(items.year,month)">\n\n                    {{ month }}\n\n                  </button>\n\n                </ion-item>\n\n      \n\n              </ion-list>\n\n            </div>\n\n          </div>\n\n      \n\n      \n\n        </ion-content>\n\n      \n\n      </ion-menu>\n\n\n\n\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Workspace\Working\pie\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__providers_ghost_service_ghost_service__["b" /* PostService */], __WEBPACK_IMPORTED_MODULE_10__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"E:\Workspace\Working\pie\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-start></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Workspace\Working\pie\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GhostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_ghost_service_ghost_service__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the GhostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var GhostComponent = (function () {
    function GhostComponent(_ghostSrv) {
        var _this = this;
        this._ghostSrv = _ghostSrv;
        this.isLoading = true;
        this.data = {};
        this.isLoadingSubscription = this._ghostSrv.isLoading.subscribe(function (data) { return _this._updateLoading(data); });
    }
    GhostComponent.prototype.ngOnDestroy = function () {
        this.isLoadingSubscription.unsubscribe();
    };
    GhostComponent.prototype._updateLoading = function (data) {
        if (!data)
            return;
        this._setData(data)._process();
    };
    GhostComponent.prototype._setData = function (data) {
        this.data = data;
        return this;
    };
    GhostComponent.prototype._process = function () {
        return this._setLoading();
    };
    GhostComponent.prototype._setLoading = function () {
        this.isLoading = this.data['isLoading'];
    };
    GhostComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ghost',
            host: { '[class.isLoading]': 'isLoading' },template:/*ion-inline-start:"E:\Workspace\Working\pie\src\components\ghost\ghost.html"*/'<!-- Generated template for the GhostComponent component -->\n\n<ng-content *ngIf="!isLoading"></ng-content>\n\n'/*ion-inline-end:"E:\Workspace\Working\pie\src\components\ghost\ghost.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_ghost_service_ghost_service__["a" /* GhostServiceProvider */]])
    ], GhostComponent);
    return GhostComponent;
}());

//# sourceMappingURL=ghost.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UtilityService = (function () {
    function UtilityService() {
        this.posts = [{
                category: 'Brokerage Recommendations for 2018',
                title: 'Kotak Mahindra MF & Param Capital buy stake',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo. Donec consequat finibus turpis, lacinia porttitor eros vehicula ac. Aenean pellentesque sem quis turpis ornare tempor. Maecenas finibus nisi tellus, sed aliquet magna eleifend vel. Mauris vel purus erat. Vivamus non velit orci. Nulla vel suscipit sem, ut ornare libero. Etiam consequat venenatis odio, fringilla suscipit sem sollicitudin ac. Vestibulum nec consequat nisl, at laoreet diam. Curabitur tincidunt vehicula nulla ultricies venenatis. Ut ultrices velit et interdum vestibulum. Nam dignissim consequat turpis ultricies ultrices. Integer a augue vitae ligula fermentum dignissim sed at felis.',
                imageSrc: 'assets/imgs/kotak.jpeg',
                authorName: 'Arbind Roy',
                date: 'January, 01 2018'
            },
            {
                category: 'Portfolio cloning',
                title: 'Top 5 picks from edelweiss',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
                imageSrc: 'assets/imgs/logo.png',
                authorName: 'Arbind Roy',
                date: 'January, 02 2018'
            },
            {
                category: 'Portfolio cloning',
                title: 'Top 5 stocks from reliance securities',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
                imageSrc: 'assets/imgs/logo.png',
                authorName: 'Arbind Roy',
                date: 'January, 02 2018'
            },
            {
                category: 'Porinju Veliyath',
                title: 'One stock where Porinju Veliyath is buying shares',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec odio pellentesque, dictum ante quis, auctor nunc. Integer commodo diam quis justo tempus, a ullamcorper libero porta. Nunc ultrices dolor urna, id accumsan tellus laoreet quis. Praesent auctor, ipsum eget pellentesque posuere, felis nisl rhoncus dolor, ac rhoncus sem sem at felis. In hac habitasse platea dictumst. Sed in lectus lectus. Praesent non elementum magna. Nunc luctus urna a nibh rhoncus placerat. Vestibulum sit amet felis pellentesque, tincidunt nisl eget, viverra augue. Nulla facilisi. Nulla quis ornare nunc. Sed condimentum arcu sed urna luctus molestie. Donec auctor euismod vehicula. Nullam tempus viverra purus, eget molestie enim finibus eget. Cras quis augue iaculis, commodo quam ac, bibendum leo',
                imageSrc: 'assets/imgs/logo.png',
                authorName: 'Arbind Roy',
                date: 'January, 03 2018'
            }
        ];
    }
    UtilityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'util-service'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UtilityService);
    return UtilityService;
}());

//# sourceMappingURL=utilityService.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Post */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GhostServiceProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PostService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { ghost } from 'ghost-cli';



/*
  Generated class for the GhostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var Post = (function () {
    function Post(id, uuid, title, slug, html, feature_image, featured, page, status, locale, visibility, meta_title, meta_description, created_at, created_by, updated_at, updated_by, published_at, published_by, custom_excerpt, codeinjection_head, codeinjection_foot, og_image, og_title, og_description, twitter_image, twitter_title, twitter_description, custom_template, author, primary_tag, url, comment_id) {
        this.id = id;
        this.uuid = uuid;
        this.title = title;
        this.slug = slug;
        this.html = html;
        this.feature_image = feature_image;
        this.featured = featured;
        this.page = page;
        this.status = status;
        this.locale = locale;
        this.visibility = visibility;
        this.meta_title = meta_title;
        this.meta_description = meta_description;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
        this.published_at = published_at;
        this.published_by = published_by;
        this.custom_excerpt = custom_excerpt;
        this.codeinjection_head = codeinjection_head;
        this.codeinjection_foot = codeinjection_foot;
        this.og_image = og_image;
        this.og_title = og_title;
        this.og_description = og_description;
        this.twitter_image = twitter_image;
        this.twitter_title = twitter_title;
        this.twitter_description = twitter_description;
        this.custom_template = custom_template;
        this.author = author;
        this.primary_tag = primary_tag;
        this.url = url;
        this.comment_id = comment_id;
    }
    return Post;
}());

var GhostServiceProvider = (function () {
    function GhostServiceProvider(http) {
        this.http = http;
        this._isLoading = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.isLoading = this._isLoading.asObservable();
        console.log('Hello GhostServiceProvider Provider');
    }
    GhostServiceProvider.prototype.setLoading = function (isLoading, group) {
        if (group === void 0) { group = null; }
        this._isLoading.next({
            isLoading: isLoading,
            group: group
        });
    };
    GhostServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], GhostServiceProvider);
    return GhostServiceProvider;
}());

var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.apiRoot = 'http://localhost:2368/ghost/api/v0.1/';
        this.posts = [];
        this.loading = false;
    }
    //service call to get all data posted
    PostService.prototype.getPost = function () {
        var apiURL = this.apiRoot + "posts/?limit=all&include=tags%2Cauthor&client_id=ghost-frontend&client_secret=7a7ab2a6cf44";
        return this.http.get(apiURL).map(function (res) {
            return res.json().posts.map(function (item) {
                return new Post(item.id, item.uuid, item.title, item.slug, item.html, item.feature_image, item.featured, item.page, item.status, item.locale, item.visibility, item.meta_title, item.meta_description, item.created_at, item.created_by, item.updated_at, item.updated_by, item.published_at, item.published_by, item.custom_excerpt, item.codeinjection_head, item.codeinjection_foot, item.og_image, item.og_title, item.og_description, item.twitter_image, item.twitter_title, item.twitter_description, item.custom_template, item.author, item.primary_tag, item.url, item.comment_id);
            });
        });
    };
    //service call to get all tags
    PostService.prototype.getTags = function () {
        this.urlTag = this.apiRoot + "tags/?limit=all&include=count.posts&order=count.posts%20ASC&client_id=ghost-frontend&client_secret=7a7ab2a6cf44";
        return this.http.get(this.urlTag).map(function (res) {
            res = res.json().tags;
            return res;
        });
    };
    //service call to get all published posts
    PostService.prototype.getPublishedPosts = function () {
        this.url = this.apiRoot + "posts/?limit=all&client_id=ghost-frontend&client_secret=7a7ab2a6cf44";
        return this.http.get(this.url).map(function (res) {
            res = res.json().posts;
            return res;
        });
    };
    PostService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]])
    ], PostService);
    return PostService;
}());

//# sourceMappingURL=ghost-service.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map