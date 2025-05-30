import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-devolucao-detalhe',
  templateUrl: './devolucao-detalhe.page.html',
  styleUrls: ['./devolucao-detalhe.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule]
})
export class DevolucaoDetalhePage implements OnInit {
  devolucaoForm: FormGroup;
  productId: number | null = null;
  product: Product | null = null;
  fotoPreview: string | ArrayBuffer | null = null;
  dataErro: string = '';
  erroGeral: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('inputData') inputData!: ElementRef<HTMLInputElement>;
  motivosPredefinidos: string[] = [
    'Produto com defeito',
    'Produto não corresponde à descrição',
    'Recebi o produto errado',
    'Produto danificado no transporte',
    'Desisti da compra',
    'Outros'
  ];
  motivoSelecionado: string = '';
  motivoOutro: string = '';
  mostrarDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.devolucaoForm = this.fb.group({
      motivo: [''],
      dataCompra: [''],
      foto: [null]
    });
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(prod => {
        this.product = prod || null;
      });
    }
  }

  onFotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.fotoPreview = reader.result;
      reader.readAsDataURL(file);
      this.devolucaoForm.patchValue({ foto: file });
    }
  }

  abrirFileInput() {
    this.fileInput.nativeElement.click();
  }

  abrirCalendario() {
    this.inputData.nativeElement.focus();
    this.inputData.nativeElement.click();
  }

  validarDataCompra() {
    const data = this.devolucaoForm.value.dataCompra;
    if (!data) {
      this.dataErro = 'Por favor, selecione a data da compra.';
      return false;
    }
    const dataSelecionada = new Date(data);
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    if (isNaN(dataSelecionada.getTime())) {
      this.dataErro = 'Data inválida.';
      return false;
    }
    if (dataSelecionada > hoje) {
      this.dataErro = 'A data não pode ser no futuro.';
      return false;
    }
    this.dataErro = '';
    return true;
  }

  enviarPedido() {
    this.erroGeral = '';
    if (!this.validarDataCompra()) return;
    const motivoFinal = this.motivoSelecionado === 'Outros' ? this.motivoOutro : this.motivoSelecionado;
    if (!motivoFinal || !this.devolucaoForm.value.dataCompra || !this.devolucaoForm.value.foto) {
      this.erroGeral = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    if (this.devolucaoForm.valid) {
      this.router.navigate(['/tabs/menu/devolucoes/sucesso']);
    }
  }

  voltar() {
    this.router.navigate(['/tabs/menu/devolucoes']);
  }
} 