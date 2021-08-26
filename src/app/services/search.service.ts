import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,of,empty} from 'rxjs'
import {map} from'rxjs/operators';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public baseUrl="http://api.serpstack.com/search"

  public searchResults:any;

  constructor(private http:HttpClient) {}

  public searchInput(term):Observable<any>{
    if(term===""){
      console.log("Not defined")
      return of([])
    }else{
      let params={access_key:environment.accessKey,query:term}
       return this.http.get(this.baseUrl,{params}).pipe(
         map(response=>{
           console.log(response)
          if(response["error"]){
            return this.searchResults=response
          }else{
            return this.searchResults=response["organic_results"]
          }


         })
       )
    }
  }

  public _searchInput(term){
    return this.searchInput(term);

  }
}
