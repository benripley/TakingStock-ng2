import { Injectable } from 'angular2/core';
import { Router } from 'angular2/router';
import 'rxjs/Rx';
import { Http, Headers } from 'angular2/http';

@Injectable()
export class AuthService {
    
    constructor(private http: Http, private _router: Router) {}
    
    signup(username:string, password:string) {
        this.http.post("url", 
            JSON.stringify({username: username, password: password}))
        .map((res) => res.json())
        .subscribe((res) => console.log(res));
    }
    
    signin(username:string, password:string) {      
        var creds = "username=" + username + "&password=" + password;
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
        this.http.post('http://localhost:8080/account/token', creds, {
            headers: headers
        })
        .map(res => res.json())
        .subscribe(
            data => { 
                this.saveJwt(data.access_token);
                this._router.navigate(['Dashboard']);
            },
            err => console.error(err),
            () => console.log('Authentication Complete')
        );
    }
    
    saveJwt(accessToken:string) {
        console.log('saving access_token to localStorage');
        if(accessToken) {
            localStorage.setItem('access_token', accessToken)
        }
    }
}