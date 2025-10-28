import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-prizes-card',
  templateUrl: './prizes-card.html',
  styleUrls: ['./prizes-card.css']
})
export class PrizesCard implements AfterViewInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const elements = {
      card: this.el.nativeElement.querySelector('.card'),
      image: this.el.nativeElement.querySelector('.roulette-image'),
      title: this.el.nativeElement.querySelector('.card-text h3'),
      subtitle: this.el.nativeElement.querySelector('.card-text p')
    };

    const titleText = this.title.toLowerCase();
    const glowColor =
      titleText.includes('minor') ? '#FFD700' : // gold
      titleText.includes('major') ? '#FF0000' : // red
      '#009DFF'; // blue (grand/default)

    const animations = {
      enter: {
        image: {
          rotation: 360,  // full rotation with bounce
          scale: 1.15,    // slightly larger scale
          filter: `drop-shadow(0 0 40px ${glowColor})`,
          duration: 0.8,  // longer duration for bounce
          ease: 'elastic.out(1, 0.5)'  // bouncy elastic ease
        },
        card: {
          borderColor: glowColor,
          boxShadow: `0 0 25px 6px ${glowColor}`
        },
        title: {
          scale: 1.1,
          textShadow: `0 0 25px ${glowColor}, 0 0 40px ${glowColor}`
        },
        subtitle: {
          color: glowColor,
          scale: 1.08,
          textShadow: `0 0 20px ${glowColor}, 0 0 35px ${glowColor}`
        }
      },
      leave: {
        image: {
          rotation: -50,
          scale: 1,
          filter: 'drop-shadow(0 0 0 transparent)'
        },
        card: {
          borderColor: 'transparent',
          boxShadow: 'none'
        },
        title: {
          scale: 1,
          textShadow: 'none'
        },
        subtitle: {
          color: 'rgba(0,0,0,0.6)',
          scale: 1,
          textShadow: 'none'
        }
      }
    };

    const animate = (el: HTMLElement, props: Record<string, any>) =>
      gsap.to(el, { 
        duration: 0.25,  // default duration
        ease: 'power2.out',  // default ease
        ...props  // override defaults with any provided values
      });

    elements.card.addEventListener('mouseenter', () => {
      animate(elements.image, animations.enter.image);
      animate(elements.card, animations.enter.card);
      animate(elements.title, animations.enter.title);
      animate(elements.subtitle, animations.enter.subtitle);
    });

    elements.card.addEventListener('mouseleave', () => {
      animate(elements.image, animations.leave.image);
      animate(elements.card, animations.leave.card);
      animate(elements.title, animations.leave.title);
      animate(elements.subtitle, animations.leave.subtitle);
    });
  }
}
