import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  filmesCarrossel: any[] = []; // filmes para o carrossel
  termoBusca: string = '';
  buscaAtiva = false;
  sidebarAtiva = false;
  currentIndex: number = 0;
  autoSlideInterval: any;

  private apiKey: string = ''; // COLOQUE SUA CHAVE
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1`;
  private carrosselUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=pt-BR&page=1`; // ex: top rated para o carrossel

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Busca todos os filmes
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.filmesFiltrados = this.filmes;

        // Classificação indicativa
        this.filmesFiltrados.forEach((filme: any) => {
          this.getClassificacao(filme.id).subscribe((data: any) => {
            const br = data.results.find((r: any) => r.iso_3166_1 === 'BR');
            filme.classificacao = br ? br.release_dates[0].certification : 'N/A';
          });
        });
      },
      error: (err) => console.error('Erro ao buscar filmes:', err)
    });

    // Busca filmes para o carrossel
    this.http.get(this.carrosselUrl).subscribe({
      next: (res: any) => {
        this.filmesCarrossel = res.results.slice(0, 5); // pega os top 5
        this.iniciarCarrossel();
      },
      error: (err) => console.error('Erro ao buscar filmes do carrossel:', err)
    });
  }

  toggleSidebar() { this.sidebarAtiva = !this.sidebarAtiva; }
  goToHome() { this.router.navigate(['/dashboard']); }
  logout() { this.router.navigate(['/login']); }

  buscar(): void {
    if (!this.termoBusca) this.filmesFiltrados = this.filmes;
    else {
      this.filmesFiltrados = this.filmes.filter(filme =>
        filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  getClassificacao(filmeId: number) {
    const url = `https://api.themoviedb.org/3/movie/${filmeId}/release_dates?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }

  getClassificacaoColor(classificacao: string) {
    switch (classificacao) {
      case 'L': return 'livre';
      case '10': return 'dez';
      case '12': return 'doze';
      case '14': return 'quatorze';
      case '16': return 'dezesseis';
      case '18': return 'dezoito';
      default: return 'sem-classificacao';
    }
  }

  // Carrossel
  iniciarCarrossel(): void {
    this.autoSlideInterval = setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, 5000);
  }

  goToSlide(index: number): void {
    const total = this.filmesCarrossel.length;
    if (total === 0) return;
    this.currentIndex = (index + total) % total;
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }
}

