import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNumberBlockComponent } from './team-number-block.component';

describe('TeamNumberBlockComponent', () => {
  let component: TeamNumberBlockComponent;
  let fixture: ComponentFixture<TeamNumberBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamNumberBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamNumberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
