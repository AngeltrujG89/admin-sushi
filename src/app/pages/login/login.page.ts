import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { GenericService } from 'src/app/shared/service/generic.service';
import { Auth, AuthRepo } from 'src/app/shared/repos/auth.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authS: GenericService,
    private toast: ToastrService,
    private authRepo:AuthRepo
  ){
    this.loginForm=this.fb.group({
      email: [null,Validators.required],
      password: [null,Validators.required]
    })

   }

  ngOnInit() {

  }


login(){
  if(!this.loginForm.valid){
    this.toast.error("Complete the form to login");

  }
  this.authS.post("user/login",{...this.loginForm.value}).subscribe(
    (res:any) =>{
      localStorage.setItem(environment.TOKEN,res.accessToken);
        localStorage.setItem('usuario',res.User.id);
        localStorage.setItem('branch',res.branch?.id);
        this.router.navigateByUrl("dashboard")
    
      }, (err) => {
        if(err.status === 404){
          this.toast.error("Invalid Credentials");
        }
      }
  );
}

}
