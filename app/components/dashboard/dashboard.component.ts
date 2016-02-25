import { Component, OnInit } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { Router } from 'angular2/router';
import { Hero, HeroService } from '../../services/hero/hero.service';
import { Position, PositionService } from '../../services/position/position.service';
import { Quote, QuoteService } from '../../services/quote/quote.service';
import { NewsService } from '../../services/news/news.service';


export class Holding {
    name: string;
    quote: Quote;
    positions: Position[];
    marketValue: number;
    change: number;
    changePercent: number;
    gain: number;
    gainPercent: number;
    totalAnnualDividend: number;
}

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public heroes: Hero[] = [];
    public portfolio: any;
    public newsFeed: any[];

    constructor(private _positionService: PositionService, private _quoteService: QuoteService, private _newsService: NewsService, private _heroService: HeroService, private _router: Router) { }

    ngOnInit() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));

        this._positionService.getPositions()
        .then((positions: Position[]) => {
            
            return _.chain(positions)
                .groupBy('symbol')
                .map((v:Position[], k:string) => { 
                    return {
                        symbol: k,
                        positions: v,
                        quantity: _.reduce(v, (m:number, n:Position) => { return m + Number(n.quantity); }, 0),
                        bookValue: _.reduce(v, function (m:number, n:Position) { return m + (Number(n.price) * Number(n.quantity) + Number(n.commission)); }, 0),
                        totalCommissions: _.reduce(v, function (m:number, n:Position) { return m + Number(n.commission); }, 0),
                    };
                }).value();
        })
        .then((holdings) => {
           
            var symbols = _.pluck(holdings, 'symbol');
            this._newsService.getNews(symbols)
            .then((news:any[]) => {
                this.newsFeed = news;
                console.log(news);
            })
            
            this._quoteService.getQuotes(symbols)
            .then((quotes: Quote[]) => {
                _.each(holdings, ((h: any) => {
                    var quote = _.find(quotes, function (q) { return q.Symbol == h.symbol; });
                    h.quote = quote;
                    h.marketValue = h.quantity * quote.LastTradePriceOnly,
                    h.change = quote.LastTradePriceOnly - quote.PreviousClose,
                    h.gain = h.quantity * h.change,
                    h.totalAnnualDividend = h.quantity * quote.DividendShare
                }));
                
                this.portfolio = {
                    holdings: holdings,
                    bookValue: _.reduce(holdings, (m:number, n:any) => { return m + Number(n.bookValue); }, 0),
                    marketValue: _.reduce(holdings, (m:number, n:any) => { return m + Number(n.marketValue); }, 0),
                    change: _.reduce(holdings, (m:number, n:any) => { return m + Number(n.change); }, 0),
                    gain: _.reduce(holdings, (m:number, n:any) => { return m + Number(n.gain); }, 0),
                    totalAnnualDividend: _.reduce(holdings, (m:number, n:any) => { return m + Number(n.totalAnnualDividend); }, 0)
                };
                console.log(this.portfolio);
            });
        });
    }



    // gotoDetail(hero: Hero) {
    //     this._router.navigate(['HeroDetail', { id: hero.id }]);
    // }
}
