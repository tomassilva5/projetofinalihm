import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelemoveisPage } from './telemoveis.page';

describe('TelemoveisPage', () => {
  let component: TelemoveisPage;
  let fixture: ComponentFixture<TelemoveisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemoveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
