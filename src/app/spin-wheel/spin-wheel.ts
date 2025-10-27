import { Component } from '@angular/core';
import { MainHeader } from "../header/main-header/main-header";
import { TotalJackpot } from "../footer/total-jackpot/total-jackpot";
import { BodyComponent } from "../body/body/body";

@Component({
  selector: 'app-spin-wheel',
  imports: [MainHeader, BodyComponent, TotalJackpot],
  templateUrl: './spin-wheel.html',
  styleUrl: './spin-wheel.css',
})
export class SpinWheel {

}
