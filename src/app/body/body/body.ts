import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { PrizesCard } from '../prizes-card/prizes-card';
import { Level } from '../level/level';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule,PrizesCard,Level],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild('wheel', { static: false }) wheel!: ElementRef;
  isSpinning = false;
  rotation = 0;
  bulbs = Array.from({ length: 24 }); // 24 bulbs evenly spaced
ngAfterViewInit() {
  const alignBulbs = () => {
    const lights = document.querySelectorAll('.bulb');
    const radius = 245;
    lights.forEach((bulb, i) => {
      const angle = (i / lights.length) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      (bulb as HTMLElement).style.left = `calc(50% + ${x}px)`;
      (bulb as HTMLElement).style.top = `calc(50% + ${y}px)`;
    });
  };

  // Run alignment once DOM and images are fully loaded
  const rimImg = document.querySelector('.rim img') as HTMLImageElement;
  if (rimImg.complete) {
    setTimeout(alignBulbs, 50);
  } else {
    rimImg.onload = () => setTimeout(alignBulbs, 50);
  }

  // Also fix if window is resized
  window.addEventListener('resize', alignBulbs);
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


