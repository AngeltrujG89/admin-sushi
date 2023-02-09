import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  user:any = null;
  currentRoute: string;
  constructor(
    private router : Router
  ) { 
    this.currentRoute = "";
    this.router.events.subscribe((event : any) => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    })
  }

  ngOnInit() {}

}
