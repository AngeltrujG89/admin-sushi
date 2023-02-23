import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { PedidosPageRoutingModule } from "../pedidos/pedidos-routing.module";
import { PromotionsRoutingModule } from "./promotions-routing.module";
import { PromotionsComponent } from "./promotions.component";

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        IonicModule,
        PromotionsRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations : [PromotionsComponent]
})
export class PromotionsModule {}