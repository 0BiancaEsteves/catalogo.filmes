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
  filmesPopulares: any[] = []; // <- para o carrossel
  termoBusca: string = '';

  private apiKey: string = 'COLOQUE A CHAVE AQUI!!';
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1`;

  currentIndex: number = 0;
  autoSlideInterval: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.filmesFiltrados = this.filmes;

        // Pegando os 3 filmes mais populares
        this.filmesPopulares = this.filmes.slice(0, 3);

        // ✅ Iniciar carrossel automático
        this.iniciarCarrossel();
      },
      error: (err) => {
        console.error('Erro ao buscar filmes:', err);
      }
    });
  }

  iniciarCarrossel(): void {
    this.autoSlideInterval = setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, 5000); // troca a cada 5 segundos
  }

  goToSlide(index: number): void {
    const total = this.filmesPopulares.length;
    if (total === 0) return;

    this.currentIndex = (index + total) % total;
  }

  buscar(): void {
    if (!this.termoBusca) {
      this.filmesFiltrados = this.filmes;
    } else {
      this.filmesFiltrados = this.filmes.filter(filme =>
        filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }
  

  irParaDetalhes(filme: any): void {
    // Isso navega para a rota de detalhes, passando o ID do filme
    this.router.navigate(['/detalhes', filme.id]); 
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
