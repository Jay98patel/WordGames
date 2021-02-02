import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordData } from '../models/wordGameData';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  selectedId: any;
  public wordGameData:WordData[]=[
    {
      id:1,question:"Anglosphere",answer:"English-speaking countries considered collectively",show:null
    },
    {
      id:2,question:"Aucklander",answer:"A native or inhabitant of city or region of Auckland, New Zealand.",show:null
    },
    {
      id:3,question:"awesomesauce",answer:"Extremely good; excellent.",show:null
    },
    {
      id:4,question:"awfulize",answer:"To class as awful or terrible",show:null
    },
    {
      id:5,question:"buzzkill",answer:"person or thing that has a depressing effect",show:null
    },
    {
      id:6,question:"catastrophize",answer:"present a situation as worse than it is",show:null
    },
    {
      id:7,question:"cheeseball",answer:"lacking taste, style, or originality",show:null
    },
    {
      id:8,question:"chillax",answer:"calm down and relax",show:null
    },
  ]
    constructor() {
      this.selectedId = null;
     }
    getAllWordData(): Observable<WordData[]> {
      return of(this.wordGameData)
    }
    removeWordData(i):Observable<WordData[]>{
      return of(this.wordGameData.splice(i,1))
    }
    playGameCorrect(item){
      item.show=true
      return item.show=item.show
    }
    playGameFalse(item){
      item.show=false
      return item.show=item.show
    }
}
