
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardsComponent } from './cards/cards.component';
import { TradeComponent } from './trade/trade.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from "@angular/forms";
import { NewsComponent } from './news/news.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { TradingDashboardComponent } from './trading-dashboard/trading-dashboard.component';
import { MarketComponent } from './market/market.component';
import { PortofolioComponent } from './portofolio/portofolio.component';
import {NgChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BasicAuthHtppInterceptorService} from "./BasicAuthHtppInterceptorService";
import { UserInfoComponent } from './user-info/user-info.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { PiechartComponent } from './piechart/piechart.component';
import {Chart, ChartOptions, ChartDataset} from 'chart.js';
import { NavbarloggedinComponent } from './navbarloggedin/navbarloggedin.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBarComponent,
    CardsComponent,
    TradeComponent,
    NewsComponent,
    WatchlistComponent,
    SigninComponent,
    DashboardComponent,
    RegisterComponent,
    TradingDashboardComponent,
    MarketComponent,
    PortofolioComponent,
    UserInfoComponent,
    ShowOrdersComponent,
    PiechartComponent,
    NavbarloggedinComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule,
    NgOptimizedImage,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,





  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
