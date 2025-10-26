import { Component } from '@angular/core';
import { MainHeader } from "../header/main-header/main-header";
import { BodyComponent } from "../body/body/body";

@Component({
  selector: 'app-spin-wheel',
  imports: [MainHeader, BodyComponent],
  templateUrl: './spin-wheel.html',
  styleUrl: './spin-wheel.css',
})
export class SpinWheel {

}
