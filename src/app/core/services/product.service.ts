import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 16 Pro Max',
      price: 1371.00,
      oldPrice: 1499.00,
      image: 'assets/icon/produtos/iphone 16 pro max.png',
      description: 'O iPhone mais avançado com chip A17 Pro, câmera de 48MP e design em titânio.',
      category: 'Telemóveis',
      brand: 'Apple',
      stock: 10,
      reviews: [
        {
          userName: 'João Silva',
          rating: 5,
          comment: 'Melhor iPhone que já tive! A câmera é incrível.',
          date: '2024-01-15'
        }
      ]
    },
    {
      id: 2,
      name: 'Samsung Galaxy S25 Ultra',
      price: 618.00,
      oldPrice: 899.00,
      image: 'assets/icon/produtos/s25ultra.png',
      description: 'Smartphone Android topo de gama com câmera de 200MP e S Pen.',
      category: 'Telemóveis',
      brand: 'Samsung',
      stock: 15,
      reviews: [
        {
          userName: 'Maria Santos',
          rating: 4,
          comment: 'Ótimo celular, mas o preço é salgado.',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: 3,
      name: 'Xiaomi 15 Ultra',
      price: 1424.98,
      image: 'assets/icon/produtos/xiaomi 15 ultra.png',
      description: 'Flagship killer com câmera Leica e processador Snapdragon 8 Gen 3.',
      category: 'Telemóveis',
      brand: 'Xiaomi',
      stock: 8,
      reviews: []
    },
    {
      id: 4,
      name: 'Xiaomi Redmi Note 14 Pro+ 5G',
      price: 529.99,
      image: 'assets/icon/produtos/redmi14proplus.png',
      description: 'Smartphone intermediário com excelente custo-benefício.',
      category: 'Telemóveis',
      brand: 'Xiaomi',
      stock: 20,
      reviews: []
    },
    {
      id: 5,
      name: 'iPhone 16',
      price: 889.99,
      image: 'assets/icon/produtos/iphone16.png',
      description: 'O novo iPhone com chip A18 e câmera aprimorada.',
      category: 'Telemóveis',
      brand: 'Apple',
      stock: 12,
      reviews: []
    },
    {
      id: 6,
      name: 'Nokia 3110',
      price: 999.99,
      image: 'assets/icon/produtos/nokia3110.jpeg',
      description: 'O lendário Nokia 3110, indestrutível e com bateria infinita.',
      category: 'Telemóveis',
      brand: 'Nokia',
      stock: 999,
      reviews: [
        {
          userName: 'Pedro Antigo',
          rating: 5,
          comment: 'Este telefone sobreviveu a uma guerra!',
          date: '1999-01-01'
        }
      ]
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(product => product.oldPrice)); // Produtos com desconto
  }
} 