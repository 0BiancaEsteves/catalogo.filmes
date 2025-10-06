import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Item {
  id: number;
  title: string;
  type: 'filme' | 'serie' | 'anime';
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  classificacao?: string;
  popular?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  allItems: Item[] = [];
  filmes: Item[] = [];
  series: Item[] = [];
  animes: Item[] = [];
  filmesCarrossel: Item[] = [];
  currentIndex: number = 0;
  autoSlideInterval: any;
  termoBusca: string = '';
  buscaAtiva = false;
  sidebarAtiva = false;

  private apiKey: string = '';
  private apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${this.apiKey}&language=pt-BR&page=1`;
  private carrosselUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=pt-BR&page=1`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchItems();
    this.fetchCarrossel();
  }

  fetchItems(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.allItems = res.results.slice(0, 100).map((item: any, index: number) => {
          let type: 'filme' | 'serie' | 'anime';
          if (item.media_type === 'movie') type = 'filme';
          else if (item.media_type === 'tv') type = 'serie';
          else type = 'anime';

          return {
            id: item.id,
            title: item.title || item.name || 'Sem título',
            type,
            poster_path: item.poster_path,
            backdrop_path: item.backdrop_path,
            overview: item.overview,
            popular: type === 'filme' && index < 10
          };
        });

        this.filmes = this.allItems.filter(i => i.type === 'filme');
        this.series = this.allItems.filter(i => i.type === 'serie');
        this.animes = this.allItems.filter(i => i.type === 'anime');

        this.allItems.forEach(item => {
          if(item.type === 'filme') {
            this.getClassificacao(item.id).subscribe((data: any) => {
              const br = data.results.find((r: any) => r.iso_3166_1 === 'BR');
              item.classificacao = br ? br.release_dates[0].certification || 'N/A' : 'N/A';
            });
          } else {
            item.classificacao = 'N/A';
          }
        });
      },
      error: (err) => console.error('Erro ao buscar itens:', err)
    });
  }

  fetchCarrossel(): void {
    this.http.get<any>(this.carrosselUrl).subscribe({
      next: (res) => {
        this.filmesCarrossel = res.results.slice(0, 5);
        this.iniciarCarrossel();
      },
      error: (err) => console.error('Erro ao buscar carrossel:', err)
    });
  }

  getLink(item: Item): string[] {
    // Sempre usar rota unificada
    return ['/sobre-filmes', item.type, item.id.toString()];
  }

  toggleSidebar() { this.sidebarAtiva = !this.sidebarAtiva; }
  goToHome() { this.router.navigate(['/dashboard']); }
  logout() { this.router.navigate(['/login']); }

  buscar(): void {
    const termo = this.termoBusca.toLowerCase();
    if(!this.termoBusca) {
      this.filmes = this.allItems.filter(i => i.type === 'filme');
      this.series = this.allItems.filter(i => i.type === 'serie');
      this.animes = this.allItems.filter(i => i.type === 'anime');
    } else {
      this.filmes = this.allItems.filter(i => i.type === 'filme' && i.title.toLowerCase().includes(termo));
      this.series = this.allItems.filter(i => i.type === 'serie' && i.title.toLowerCase().includes(termo));
      this.animes = this.allItems.filter(i => i.type === 'anime' && i.title.toLowerCase().includes(termo));
    }
  }

  getClassificacao(filmeId: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${filmeId}/release_dates?api_key=${this.apiKey}&language=pt-BR`);
  }

  getClassificacaoColor(classificacao: string) {
    switch(classificacao) {
      case 'L': return 'livre';
      case '10': return 'dez';
      case '12': return 'doze';
      case '14': return 'quatorze';
      case '16': return 'dezesseis';
      case '18': return 'dezoito';
      default: return 'sem-classificacao';
    }
  }

  iniciarCarrossel(): void {
    this.autoSlideInterval = setInterval(() => this.goToSlide(this.currentIndex + 1), 5000);
  }

  goToSlide(index: number): void {
    const total = this.filmesCarrossel.length;
    if(total === 0) return;
    this.currentIndex = (index + total) % total;
  }

  ngOnDestroy(): void {
    if(this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }
}
