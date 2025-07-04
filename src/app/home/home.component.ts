import { Component, inject, signal } from '@angular/core';
import { GameService } from '../game.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  levels = [1, 2, 3, 4, 5];
  gameService = inject(GameService);

}
