import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WordData } from 'src/app/models/wordGameData';
import { MasterDataService } from 'src/app/services/master-data.service';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss']
})
export class WordGameComponent implements OnInit {

  wordsData: Observable<WordData[]> = null;
  selectedId: any;
  gameData: WordData
  wordGameForm: FormGroup;
  ans: any
  showMsg:Boolean=false
  btnValue:Boolean=true

  constructor(private _wordDataServices: MasterDataService, public fb: FormBuilder) {
    this.wordGameForm = this.buildForm()
  }

  ngOnInit(): void {
    this.selectedId = null;
    this.wordsData = this._wordDataServices.getAllWordData()
    this._wordDataServices.getAllWordData().subscribe(res => {
      console.log(res)
      this.ans = res
    })
  }
  private buildForm(): FormGroup {
    return this.fb.group({
      question: ['',[Validators.required]],
      answer: ['',[Validators.required]]
    })
  }
  get wordFormControl() {
    return this.wordGameForm.controls;
  }
  saveWordData() {
    let formData: WordData = this.wordGameForm.getRawValue();
    if (this.gameData) {
      formData = { ...this.gameData, ...formData }
      let index = this._wordDataServices.wordGameData.findIndex(item => item.id === this.gameData.id);
      if (index >= 0) {
        this._wordDataServices.wordGameData[index] = formData
        this.showMsg=true
        setTimeout(()=>{
          this.showMsg=false
          this.btnValue=true
          this.wordGameForm = this.buildForm()
          },2000)
      }
    }
    else {
      formData = { ...formData, ...{ id: this._wordDataServices.wordGameData.length + 1 } }
      this._wordDataServices.wordGameData = [...this._wordDataServices.wordGameData, formData];
      this._wordDataServices.getAllWordData().subscribe(res => {
        this.ans = res
        this.showMsg=true
        setTimeout(()=>{
          this.showMsg=false
          this.btnValue=true
          this.wordGameForm = this.buildForm()
          },2000)
      })
    }
  }
  cancelFormEdit(){
    this.wordGameForm = this.buildForm()
    this.btnValue=true
  }
  correctAns(item) {
    this._wordDataServices.playGameCorrect(item)
  }
  wrongAns(item) {
    this._wordDataServices.playGameFalse(item)
  }
  removeFlashCard(i) {
    this._wordDataServices.removeWordData(i)
    // console.log("card removed")
  }
  editAns(id) {
    if (id) {
      this.gameData = this._wordDataServices.wordGameData.find(item => item.id === id)
      if (this.gameData) {
        this.wordGameForm.patchValue(this.gameData)
        this.btnValue=false
      }
    }
  }

}
