import { Component, OnInit } from '@angular/core';
import { AuthRepo } from '../../repos/auth.repository';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  user:any = null;
  constructor(private authS:AuthRepo) { }

  ngOnInit() {
    this.authS.auth$.subscribe( (res: any) => {
      this.user = res.data;

    });

  }

}
