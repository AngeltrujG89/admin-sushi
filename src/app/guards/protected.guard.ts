import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Roles } from '../enums/sockets.enum';
import { AuthRepo } from '../shared/repos/auth.repository';
import { OrderRepo } from '../shared/repos/orders.repository';
import { GenericService } from '../shared/service/generic.service';

let user:boolean = false
@Injectable({
  providedIn: 'root'
})
export class ProtectedGuard implements CanActivate {
  constructor(
    private router: Router,
    private userS:GenericService,
    private authrepo:AuthRepo,
    private toastr:ToastrService,
    private orderRepo:OrderRepo){}
  canActivate(route: ActivatedRouteSnapshot ){
    if (!localStorage.getItem(environment.TOKEN)) {
      this.router.navigateByUrl("");
      return false
     }
     else {
      if(!user){
        this.userS.getOne("user",localStorage.getItem("usuario") || "" ).subscribe((res:any) => {
          if(res.role === Roles.CUSTOMER){
            this.toastr.error("user not authorized to use in this system")
            return false;
          }else{
            this.authrepo.setAuth([res])
            return true
          }
        },err => {
          return false
        })
        this.userS.params("order",{id:localStorage.getItem("branch") || undefined,start:new Date().toISOString().substr(0,10)}).subscribe((res:any) =>{
         console.log(res);

          this.orderRepo.setOrders(res)
        })
        user=true
      }

      return true
     }
  }

}
