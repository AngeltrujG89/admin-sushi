import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/service/generic.service';

@Component({
  selector: 'app-quejas',
  templateUrl: './quejas.page.html',
  styleUrls: ['./quejas.page.scss'],
})
export class QuejasPage implements OnInit {
quejas:any[]=[] ;
  constructor(private quejasS:GenericService, private toast:ToastrService) { }

  ngOnInit() {
    this.quejasS.getAll("queja").subscribe((res:any) => {
      this.quejas=res
      console.log(this.quejas);

    }
    )
  }


  delete(id:number){
    this.quejasS.delete("queja",id).subscribe( (res:any) => {
      this.toast.success('Deleted')
      this.quejas = this.quejas.filter((q:any)=> q.id !== id);
    })
  }

}
