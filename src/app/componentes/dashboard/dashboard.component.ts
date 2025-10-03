// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  filmesPopulares: any[] = [];
  termoBusca: string = '';

  private apiKey: string = '';//COLOQUE A SENHA!!
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1`;

  currentIndex: number = 0;
  autoSlideInterval: any;
  buscaAtiva = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.filmesFiltrados = this.filmes.slice(0, 20); // primeira página
        this.filmesPopulares = this.filmes.slice(0, 5); // carrossel
        this.iniciarCarrossel();
      },
      error: (err) => console.error('Erro ao buscar filmes:', err)
    });
  }

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

  buscar(): void {
    if (!this.termoBusca) {
      this.filmesFiltrados = this.filmes.slice(0, 20);//buscar
    } else {
      this.filmesFiltrados = this.filmes.filter(filme =>
        filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }
}

