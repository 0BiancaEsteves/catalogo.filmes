// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  filmesPopulares: any[] = [];
  termoBusca: string = '';

  private apiKey: string = ''; // COLOQUE SUA CHAVE AQUI
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1`;

  currentIndex: number = 0;
  autoSlideInterval: any;
  buscaAtiva = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Buscar filmes populares
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.filmesFiltrados = this.filmes.slice(0, 20);
        this.filmesPopulares = this.filmes.slice(0, 5);//carousel

        // Puxar classificação indicativa de cada filme
        this.filmesFiltrados.forEach((filme: any) => {
          this.getClassificacao(filme.id).subscribe((data: any) => {
            const br = data.results.find((r: any) => r.iso_3166_1 === 'BR');
            filme.classificacao = br ? br.release_dates[0].certification : 'N/A';
          });
        });

        this.iniciarCarrossel();
      },
      error: (err) => console.error('Erro ao buscar filmes:', err)
    });
  }

  // Método para buscar classificação indicativa
  getClassificacao(filmeId: number) {
    const url = `https://api.themoviedb.org/3/movie/${filmeId}/release_dates?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }

  // Retorna a classe CSS de acordo com a classificação
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
    const total = this.filmesPopulares.length;
    if (total === 0) return;
    this.currentIndex = (index + total) % total;
  }

  // Busca de filmes
  buscar(): void {
    if (!this.termoBusca) {
      this.filmesFiltrados = this.filmes.slice(0, 20);
    } else {
      this.filmesFiltrados = this.filmes.filter(filme =>
        filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  // Logout
  logout(): void {
    this.router.navigate(['/login']);
  }

  // Limpar intervalo do carrossel
  ngOnDestroy(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }
}



