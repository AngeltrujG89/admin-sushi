import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-collaborators',
  templateUrl: './options-collaborators.component.html',
  styleUrls: ['./options-collaborators.component.scss'],
})
export class OptionsCollaboratorsComponent implements OnInit {

  constructor(
    private popoverController : PopoverController
  ) { }

  ngOnInit() {}

  async cerrarPop() {
    const popover = await this.popoverController.dismiss();
  }

}
