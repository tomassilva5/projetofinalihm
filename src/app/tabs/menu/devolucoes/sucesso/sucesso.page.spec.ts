import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucessoPage } from './sucesso.page';

describe('SucessoPage', () => {
  let component: SucessoPage;
  let fixture: ComponentFixture<SucessoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucessoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SucessoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 