import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Eventos, Status } from 'src/app/enums/sockets.enum';
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
    private orderRepo:OrderRepo
  ) { }

  ngOnInit() {
    this.authRepo.auth$.subscribe((res:any) => this.user=res[0]);
  }


  redirect(id: string){
    this.router.navigate(['dashboard/restaurant'], { queryParams: { id } });
  }



}
