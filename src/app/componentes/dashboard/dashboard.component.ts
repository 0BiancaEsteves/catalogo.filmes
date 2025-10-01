import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Interface simples para os dados do carrossel
interface CarouselImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Propriedades da API de Filmes
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  termoBusca: string = '';

  private apiKey: string = 'COLOCAR A CHAVER AQUI!!!'; // Sua chave
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
        // Opcional: Você pode querer usar as imagens dos filmes no carrossel.
        // Se não for o caso, mantenha o array `carouselImages` acima.
      },
      error: (err) => {
        console.error('Erro ao buscar filmes:', err);
        // Trate o erro, talvez mostrando uma mensagem para o usuário.
      }
    });
  }

//---------Metodo  do carousel---------
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



