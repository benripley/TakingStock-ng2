import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'signin',
  templateUrl: 'app/components/signin/signin.component.html'
})
export class SigninComponent {

    public username: string;
    public password: string;   

    constructor(private _authService: AuthService, private _router: Router) { }

    signin() {
        this._authService.signin(this.username, this.password);
    }
}