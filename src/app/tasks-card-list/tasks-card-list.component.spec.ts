import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCardListComponent } from './tasks-card-list.component';

describe('TasksCardListComponent', () => {
  let component: TasksCardListComponent;
  let fixture: ComponentFixture<TasksCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
