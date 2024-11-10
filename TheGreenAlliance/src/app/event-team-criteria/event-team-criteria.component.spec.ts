import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTeamCriteriaComponent } from './event-team-criteria.component';

describe('EventTeamCriteriaComponent', () => {
  let component: EventTeamCriteriaComponent;
  let fixture: ComponentFixture<EventTeamCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTeamCriteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTeamCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
