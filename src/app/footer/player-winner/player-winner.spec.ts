import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWinner } from './player-winner';

describe('PlayerWinner', () => {
  let component: PlayerWinner;
  let fixture: ComponentFixture<PlayerWinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerWinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerWinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
