import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Interface simples para os dados do carrossel
interface CarouselImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <- adicionei RouterModule aqui
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Propriedades da API de Filmes
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  termoBusca: string = '';

  private apiKey: string = 'COLOQUE A CHAVE AQUI!!'; //COLOQUE A CHAVE AQUI!!
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1`;

  //-------Adição de imagens do carousel------
  carouselImages: CarouselImage[] = [
    { src: 'img/animes/C-OnePece.png', alt: 'Descrição Imagem 1' },
    { src: 'caminho/para/imagem2.jpg', alt: 'Descrição Imagem 2' },
    { src: 'caminho/para/imagem3.jpg', alt: 'Descrição Imagem 3' },
  ];
  currentIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Busca os filmes populares da The Movie DB
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.filmesFiltrados = this.filmes;
      },
      error: (err) => {
        console.error('Erro ao buscar filmes:', err);
      }
    });
  }

  //---------Método do carousel---------
  goToSlide(index: number): void {
    if (index >= 0 && index < this.carouselImages.length) {
      this.currentIndex = index;
    }
  }

  // Lógica de busca de filmes
  buscar(): void {
    if (!this.termoBusca) {
      this.filmesFiltrados = this.filmes;
    } else {
      this.filmesFiltrados = this.filmes.filter(filme =>
        filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }
}



