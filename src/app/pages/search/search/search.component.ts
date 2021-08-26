import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,throwError} from 'rxjs';
import {map, debounceTime,distinctUntilChanged,switchMap,catchError} from 'rxjs/operators';
import {SearchService} from '../../../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading:boolean;
  public searchTerm= new Subject<string>();
  public searchResults:any;
  public paginationElements:any;
  public errorMessage:any;
  searchForm:FormGroup;


  constructor(private fb:FormBuilder,private searchService:SearchService) { }



  ngOnInit(): void {
    this.buildForm();
    this.search();

  }

  buildForm(){
    this.searchForm=this.fb.group({
      search:["",Validators.required]
    })
  }

  public search(){
    console.log("in search")

    this.searchTerm.pipe(
      map((e:any)=>{
        console.log("e target",e.target.value);
        return e.target.value;
      }),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term=>{
        this.loading= true;
        return this.searchService._searchInput(term)
      }),
      // catchError((e)=>{
      //   console.log("error",e)
      //   this.loading=false;
      //   this.errorMessage=e.message;
      //   return throwError(e)
      // })
    ).subscribe(v=>{
      console.log('v', v)
      this.loading=false;
      if(v.error){
        console.log("error",v.error)
        this.errorMessage=v.error;
      }else{
        this.searchResults=v;
        this.errorMessage=undefined;
        console.log('this.searchResults', this.searchResults)
      }

    })
  }




}
