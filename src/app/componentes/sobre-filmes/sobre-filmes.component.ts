// sobre-filmes.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-sobre-filmes',
  standalone: true, // Garante que o componente é Standalone
  imports: [
    CommonModule,     // Permite usar *ngIf, *ngFor, pipes
    RouterModule,     // Permite usar a diretiva routerLink no template
    HttpClientModule  // Embora o HttpClient seja injetado, é bom ter o módulo
  ], 
  templateUrl: './sobre-filmes.component.html',
  styleUrls: ['./sobre-filmes.component.css']
})
export class SobreFilmesComponent implements OnInit {
  movieData: any;

  private apiKey: string = 'COLOQUE A SENHA AQUI!'; //COLOQUE A CHAVE AQUI!!

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
     if (movieId) {
      // Endpoint para buscar os detalhes do filme
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR`;
      
      this.http.get(url)
        .subscribe({
          next: data => {
            this.movieData = data;
            console.log('Dados do filme carregados:', this.movieData);
          },
          error: err => console.error('Erro ao buscar detalhes do filme:', err)
        });
    }
  }
}
