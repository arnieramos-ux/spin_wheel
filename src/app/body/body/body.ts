import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild('wheel', { static: false }) wheel!: ElementRef;
  isSpinning = false;
  rotation = 0;
  bulbs = Array.from({ length: 24 }); // 24 bulbs evenly spaced

 ngAfterViewInit() {
  // wait for DOM to render and stabilize
  setTimeout(() => {
    const lights = document.querySelectorAll('.bulb');
    const radius = 245;
    lights.forEach((bulb, i) => {
      const angle = (i / lights.length) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      (bulb as HTMLElement).style.left = `calc(50% + ${x}px)`;
      (bulb as HTMLElement).style.top = `calc(50% + ${y}px)`;
    });
  }, 100); // short delay ensures proper layout
}

  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const randomExtra = Math.floor(Math.random() * 360);
    const spinAmount = 360 * 5 + randomExtra;
    this.rotation += spinAmount;

    gsap.to(this.wheel.nativeElement, {
      rotation: this.rotation,
      duration: 10,
      ease: 'power3.out',
      onComplete: () => {
        this.isSpinning = false;
        console.log('Wheel stopped at', (this.rotation % 360).toFixed(2), 'degrees');
      }
    });
  }
}


