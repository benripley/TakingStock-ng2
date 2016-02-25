import { Injectable } from 'angular2/core';
import 'rxjs/Rx';
import { Http, Jsonp, Headers } from 'angular2/http';
import { QUOTES } from './mock-quotes';

export interface Quote {
    Change: number; //"+0.97",
    Currency: string;
    DividendShare: number;
    LastTradeDate: Date;
    LastTradePriceOnly: number;
    EarningsShare: number;
    DaysLow: number;
    DaysHigh: number;
    YearLow: number;
    YearHigh: number;
    MarketCapitalization: string;
    EBITDA: string;
    ChangeFromYearLow: number;
    ChangeFromYearHigh: number;
    FiftydayMovingAverage: number;
    TwoHundreddayMovingAverage: number;
    ChangeFromTwoHundreddayMovingAverage: number;
    ChangeFromFiftydayMovingAverage: number;
    Name: string;
    PreviousClose: number;
    PriceSales: number;
    PriceBook: number;
    ExDividendDate: Date;
    PERatio: number;
    DividendPayDate: Date;
    PEGRatio: number;
    PriceEPSEstimateCurrentYear: number;
    PriceEPSEstimateNextYear: number;
    Symbol: string;
    ShortRatio: number;
    Volume: number;
    StockExchange: string;
    DividendYield: number;
}

@Injectable()
export class QuoteService {
    
    private quotes:Quote[];
    private TTL:number = 1000 * 60 * 20; // cache quotes for 20 mins
    private timestamp:Date = new Date(2016,1,1);
    
    constructor(private http: Http, private jsonp: Jsonp) {}
   
    getQuotes(symbols: string[]) { 
        
        var millis = this.timestamp.getTime() + this.TTL;
        var valid = millis > new Date().getTime();
        
        if (this.quotes && valid) {
            return Promise.resolve(this.quotes);
        }
             
        this.quotes = QUOTES;
        this.timestamp = new Date();
        return Promise.resolve(this.quotes);
        
        // Hit API and return as Observable...
        // var symbolString = symbols.map((s: string) => { return '"' + s + '"'; }).join(",");
        // var url = 'https://query.yahooapis.com/v1/public/yql' + '?q=select * from yahoo.finance.quotes where symbol in (' + symbolString + ')&env=http://datatables.org/alltables.env&format=json&callback=JSONP_CALLBACK';
        // return this.jsonp.get(url)
        //     .map((res) => res.json().query.results.quote).toPromise();
    }
}