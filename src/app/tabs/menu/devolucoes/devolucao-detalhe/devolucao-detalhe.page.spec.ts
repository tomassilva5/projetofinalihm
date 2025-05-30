import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevolucaoDetalhePage } from './devolucao-detalhe.page';

describe('DevolucaoDetalhePage', () => {
  let component: DevolucaoDetalhePage;
  let fixture: ComponentFixture<DevolucaoDetalhePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucaoDetalhePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DevolucaoDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 