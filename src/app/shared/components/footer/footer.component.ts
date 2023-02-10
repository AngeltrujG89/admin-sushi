import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  user:any = null;
  currentRoute: string | undefined;
  constructor(
    private popoverController : PopoverController,
    public router : Router
  ) { }

  ngOnInit() {
    this.currentRoute = "";
    this.router.events.subscribe((event : any) => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.url;
        console.log(this.currentRoute);
      }
    })
  }

  async opcionesRes(ev: any, tipo :string) {
    if (tipo === "configuraciones") {
      const popover = await this.popoverController.create({
        component: "",
        cssClass: 'popOver',
        event: ev,
        mode: 'ios',
        translucent: true
      });
      await popover.present();
    }
  }

  logout() {
    // this.sesionService.logout().then(_ => {
    //   this.router.navigateByUrl('/login');
    // });
  }

}
