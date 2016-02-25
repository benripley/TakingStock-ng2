import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
  selector: 'signup',
  templateUrl: 'app/components/signup/signup.component.html'
})
export class SignupComponent {

  constructor(private _router: Router) { }

}