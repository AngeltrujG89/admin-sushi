import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Eventos, Status } from 'src/app/enums/sockets.enum';
import { OptionsCollaboratorsComponent } from 'src/app/shared/components/options-collaborators/options-collaborators.component';
import { OptionsRestaurantsComponent } from 'src/app/shared/components/options-restaurants/options-restaurants.component';
import { AuthRepo } from 'src/app/shared/repos/auth.repository';
import { OrderRepo } from 'src/app/shared/repos/orders.repository';
import { SocketsService } from 'src/app/shared/service/sockets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user:any
  constructor(
    private router: Router,
    private authRepo:AuthRepo,
    private wsService:SocketsService,
    private toastr:ToastrService,
    private orderRepo:OrderRepo,
    public popoverController : PopoverController,
  ) { }

  ngOnInit() {
    this.authRepo.auth$.subscribe((res:any) => this.user=res[0]);
  }


  redirect(id: string){
    this.router.navigate(['dashboard/restaurant'], { queryParams: { id } });
  }

  async optionsRest(ev: any, tipo : string) {
    let popover : any
    switch (tipo) {
      	case "restaurants":
        	popover = await this.popoverController.create({
          		component: OptionsRestaurantsComponent,
          		cssClass: 'popOver',
          		event: ev,
          		mode: 'ios',
          		translucent: true
        	});
        break
    }
    await popover.present()
  }

  async optionsCollab(ev: any, tipo : string) {
    let popover : any
    switch (tipo) {
      	case "collaborators":
        	popover = await this.popoverController.create({
          		component: OptionsCollaboratorsComponent,
          		cssClass: 'popOver',
          		event: ev,
          		mode: 'ios',
          		translucent: true
        	});
        break
    }
    await popover.present()
  }



}
