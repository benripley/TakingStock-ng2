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
    
    private TTL:number = 2 * 1000 * 60 * 60; // cache for 2 hours
    private timestamp:number = 0;
    
    constructor(private jsonp: Jsonp) {}
   
    getNews(symbols: string[]) { 
        
        var now = new Date().getTime();
        var valid = this.timestamp > now;
        
        if (this.news && valid) {
            return Promise.resolve(this.news);
        }
        
        var symbolString = _.map(symbols, function(s) { return '"' + s + '"'; }).join(",");
        var serviceBase = 'http://feeds.finance.yahoo.com/rss/2.0/headline?region=US&lang=en-US&s=';
        var url = serviceBase + symbolString;

        this.timestamp = now + this.TTL;
        return this.jsonp.get('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=20&callback=JSONP_CALLBACK&q=' + encodeURIComponent(url))
            .map((res) => res.json().responseData.feed.entries).toPromise()
            .then((news:newsFeedItem[]) => {
                this.news = news;
                return this.news;
            });
    }
}