import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevolucoesPage } from './devolucoes.page';

describe('DevolucoesPage', () => {
  let component: DevolucoesPage;
  let fixture: ComponentFixture<DevolucoesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucoesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DevolucoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 