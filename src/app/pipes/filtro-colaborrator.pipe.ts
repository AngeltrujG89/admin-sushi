import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroColaborrator'
})
export class FiltroColaborratorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
      if(arg === null){
        return value
      }
    for(const post of value){
      if(post.names.indexOf(arg) > -1){
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
