import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },
  {
    path:'home',loadChildren:()=>import('./word-game-home/word-game-home.module').then(m=>m.WordGameHomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
