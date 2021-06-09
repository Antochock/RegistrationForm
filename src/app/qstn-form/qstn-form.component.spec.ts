import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QstnFormComponent } from './qstn-form.component';

describe('QstnFormComponent', () => {
  let component: QstnFormComponent;
  let fixture: ComponentFixture<QstnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QstnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QstnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
