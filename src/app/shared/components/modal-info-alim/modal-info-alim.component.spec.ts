import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoAlimComponent } from './modal-info-alim.component';

describe('ModalInfoAlimComponent', () => {
  let component: ModalInfoAlimComponent;
  let fixture: ComponentFixture<ModalInfoAlimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfoAlimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoAlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
