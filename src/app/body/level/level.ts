import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-level',
  standalone: true,
  templateUrl: './level.html',
  styleUrl: './level.css'
})
export class Level {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
