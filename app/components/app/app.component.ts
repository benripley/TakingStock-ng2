import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthService } from '../../services/auth/auth.service';
import { HeroService } from '../../services/hero/hero.service';
import { PositionService } from '../../services/position/position.service';
import { QuoteService } from '../../services/quote/quote.service';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/components/app/app.component.html',
  styleUrls: ['app/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService, PositionService, AuthService, QuoteService, NewsService, ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/signup', name: 'Signup', component: SignupComponent },
    { path: '/signin', name: 'Signin', component: SigninComponent },
    { path: '/heroes', name: 'Heroes', component: HeroesComponent },
    { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])
export class AppComponent {
    public title = 'Quotes';
  
    isActive(path:string) {
        if(path === location.pathname){
            return true;
        }
        else if(path.length > 0){
            return location.pathname.indexOf(path) > -1;
        }
    }
}
