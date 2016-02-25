import { Injectable } from 'angular2/core';
import 'rxjs/Rx';
import { Jsonp } from 'angular2/http';

export interface newsFeedItem {
    author: string;
    categories: any[];
    content: string;
    contentSnippet: string;
    link: string;
    publishedDate: string;
    title: string;
}

@Injectable()
export class NewsService {
    
    private news: newsFeedItem[];
    
    private TTL:number = 1000 * 60 * 20; // cache news for 20 mins
    private timestamp:Date = new Date(2016,1,1);
    
    constructor(private jsonp: Jsonp) {}
   
    getNews(symbols: string[]) { 
        
        var millis = this.timestamp.getTime() + this.TTL;
        var valid = millis > new Date().getTime();
        
        if (this.news && valid) {
            return Promise.resolve(this.news);
        }
        
        var symbolString = _.map(symbols, function(s) { return '"' + s + '"'; }).join(",");
        var serviceBase = 'http://feeds.finance.yahoo.com/rss/2.0/headline?region=US&lang=en-US&s='; //s=AAPL,GOOG
        var url = serviceBase + symbolString;

        millis = new Date().getTime() + this.TTL;
        return this.jsonp.get('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSONP_CALLBACK&q=' + encodeURIComponent(url))
            .map((res) => res.json().responseData.feed.entries).toPromise()
            .then((news:newsFeedItem[]) => {
                this.news = news;
                return this.news;
            });
    }
}