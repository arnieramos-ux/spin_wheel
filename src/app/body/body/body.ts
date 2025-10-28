import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';
import { PrizesCard } from '../prizes-card/prizes-card';
import { Level } from '../level/level';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, PrizesCard, Level],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild('wheel') wheel!: ElementRef;
  @ViewChild('winnerBanner') winnerBanner!: ElementRef;

  winnerText = '';
  winnerImage = '';
  spinCount = 1;
  isSpinning = false;
  rotation = 0;
  bulbs = Array.from({ length: 24 });

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

    const rimImg = document.querySelector('.rim img') as HTMLImageElement;
    if (rimImg.complete) setTimeout(alignBulbs, 50);
    else rimImg.onload = () => setTimeout(alignBulbs, 50);
    window.addEventListener('resize', alignBulbs);
  }

  spinWheel() {
    if (this.isSpinning || this.spinCount <= 0) return;
    this.spinCount--;
    this.isSpinning = true;

    const totalSlices = 6;
    const sliceAngle = 360 / totalSlices;
    const randomIndex = Math.floor(Math.random() * totalSlices);
    const targetAngle = randomIndex * sliceAngle + sliceAngle / 2;
    const finalRotation = 360 * 5 - targetAngle;
    this.rotation = finalRotation;

    gsap.to(this.wheel.nativeElement, {
      rotation: finalRotation,
      duration: 10,
      ease: 'power4.out',
      onComplete: () => {
        this.isSpinning = false;
        const slices = this.wheel.nativeElement.querySelectorAll('.slice');
        const selectedSlice = slices[randomIndex] as HTMLElement;
        const prizeText = selectedSlice.querySelector('span')?.textContent?.trim() || 'Unknown Prize';
        const prizeImg = selectedSlice.querySelector('img')?.getAttribute('src') || '';
        this.showWinningAnimation(prizeText, prizeImg);
        this.launchConfetti();
        gsap.to(this.wheel.nativeElement, {
          rotation: finalRotation + 5,
          duration: 0.3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        });
      }
    });
  }

  launchConfetti() {
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }

  showWinningAnimation(prize: string, imgSrc: string) {
    this.winnerText = `YOU WON: ${prize}! 🎉`;
    this.winnerImage = imgSrc;
    const banner = this.winnerBanner.nativeElement;
    gsap.set(banner, { opacity: 0, scale: 0.5, y: 50 });
    gsap.to(banner, { opacity: 1, scale: 1.2, y: 0, duration: 1, ease: 'back.out(1.7)' });
    gsap.to(banner, { scale: 1, duration: 0.4, delay: 1, ease: 'back.inOut(2)' });
    gsap.to(banner, { opacity: 0, duration: 1, delay: 3, ease: 'power1.out' });
  }
}
