import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { PostDetailPage } from '../pages/posts/postdetail';
import { GhostComponent } from '../components/ghost/ghost';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GhostServiceProvider,PostService } from '../providers/ghost-service/ghost-service';
import { UtilityService } from './utilityService';
import { CategoryFilterPage } from '../pages/filterCategory/filterCategory';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    PostDetailPage,
    GhostComponent,
    SubscribePage,
    LoginPage,
    SplashPage,
    CategoryFilterPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    PostDetailPage,
    GhostComponent,
    SubscribePage,
    LoginPage,
    SplashPage,
    CategoryFilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GhostServiceProvider,
    UtilityService,
    PostService,
    DatePipe
  ]
})
export class AppModule {}
