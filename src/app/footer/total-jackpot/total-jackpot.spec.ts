import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalJackpot } from './total-jackpot';

describe('TotalJackpot', () => {
  let component: TotalJackpot;
  let fixture: ComponentFixture<TotalJackpot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalJackpot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalJackpot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
