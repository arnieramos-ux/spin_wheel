import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body';
import { PrizesCard } from '../prizes-card/prizes-card';
import { CommonModule } from '@angular/common';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [BodyComponent, PrizesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have wheel element', () => {
    const wheelElement = fixture.nativeElement.querySelector('.wheel');
    expect(wheelElement).toBeTruthy();
  });

  it('should have prize cards', () => {
    const prizeCards = fixture.nativeElement.querySelectorAll('.prize-card');
    expect(prizeCards.length).toBe(3);
  });

  it('should initialize with rotation 0', () => {
    expect(component.rotation).toBe(0);
  });

  it('should not be spinning initially', () => {
    expect(component.isSpinning).toBeFalse();
  });
});
