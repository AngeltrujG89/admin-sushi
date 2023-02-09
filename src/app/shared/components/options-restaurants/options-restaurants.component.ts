import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-restaurants',
  templateUrl: './options-restaurants.component.html',
  styleUrls: ['./options-restaurants.component.scss'],
})
export class OptionsRestaurantsComponent implements OnInit {

  constructor(
    private popoverController : PopoverController
  ) { }

  ngOnInit() {}

  async cerrarPop() {
    const popover = await this.popoverController.dismiss();
  }

}
