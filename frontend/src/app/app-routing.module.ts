import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {TradingDashboardComponent} from "./trading-dashboard/trading-dashboard.component";
import {MarketComponent} from "./market/market.component";
import {PortofolioComponent} from "./portofolio/portofolio.component";
import { NavbarloggedinComponent } from './navbarloggedin/navbarloggedin.component';

const routes: Routes = [
  {path: "login", component:SigninComponent},
  {path: '', component: DashboardComponent},
  {path : 'dashboard', component: DashboardComponent},
  {path : 'register', component : RegisterComponent},
  {path: 'trade', component : TradingDashboardComponent},
  {path : 'market', component:MarketComponent},
  {path : 'portofolio', component:PortofolioComponent},
  {path : 'loggedin', component:NavbarloggedinComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
