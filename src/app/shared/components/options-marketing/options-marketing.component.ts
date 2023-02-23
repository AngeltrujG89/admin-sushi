import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-marketing',
  templateUrl: './options-marketing.component.html',
  styleUrls: ['./options-marketing.component.scss'],
})
export class OptionsMarketingComponent implements OnInit {

  constructor(
    private popoverController : PopoverController
  ) { }

  ngOnInit() {}

  async cerrarPop() {
    const popover = await this.popoverController.dismiss();
  }

}
