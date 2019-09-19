import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-project';
  isAdmin: boolean = false;

  constructor(private _router: Router){

  }
  ngOnInit() {
    this._router.events.subscribe(routing => {
      if (routing instanceof NavigationStart) {
        //this.isAdmin = false;
      }
      if (routing instanceof NavigationEnd) {
        if (
          routing.urlAfterRedirects.includes('/admin')
          ) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
        //this.window.scrollTo(0, 0);
      }
    });
  }
  toggleMenu(){
    console.log("toggle");
  }
}
