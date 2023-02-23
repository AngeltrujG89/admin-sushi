import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  Uri=environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }

    getOne(ruta:string,id:number | string){
      return this.http.get(this.Uri+ruta+'/'+id)
    }
    getAll(ruta:string,params?:any){
      return this.http.get(this.Uri+ruta,{params})
    }
    delete(ruta:string,id:number){
      return this.http.delete(this.Uri+ruta+'/'+id)
    }
    update(ruta:string,id:number,data:any){
      return this.http.patch(this.Uri+ruta+'/'+id,data)
    }
    updateWhitImage(ruta:string,id:number,data:FormData){
      return this.http.patch(this.Uri+ruta+'/'+id,data)
    }
    post(ruta:string,data:any){
      return this.http.post(this.Uri+ruta,data)
    }
    postWhitImage(ruta:string,data:FormData){
      return this.http.post(this.Uri+ruta,data)
    }
    params(ruta:string,params:any){
      return this.http.get(environment.server + ruta,{
        params
      })
    
    }


  

}
