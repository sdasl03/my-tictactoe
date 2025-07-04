import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {path:'',component: HomeComponent },
    {path:'board',component: BoardComponent, canActivate:[()=> inject(GameService).boardReady()]}
];
