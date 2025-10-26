import { Component } from '@angular/core';
import { MainHeader } from "../header/main-header/main-header";
import { PlayerWinner } from "../footer/player-winner/player-winner";
import { TotalJackpot } from "../footer/total-jackpot/total-jackpot";

@Component({
  selector: 'app-spin-wheel',
  imports: [MainHeader, PlayerWinner, TotalJackpot],
  templateUrl: './spin-wheel.html',
  styleUrl: './spin-wheel.css',
})
export class SpinWheel {

}
