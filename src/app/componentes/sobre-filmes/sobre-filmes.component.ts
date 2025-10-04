import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-sobre-filmes',
  standalone: true, // Garante que o componente é Standalone
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ], 
  templateUrl: './sobre-filmes.component.html',
  styleUrls: ['./sobre-filmes.component.css']
})
export class SobreFilmesComponent implements OnInit {
  movieData: any;

  private apiKey: string = '';//COLOQUE A CHAVE AQUI!!

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR`;

      this.http.get(url).subscribe({
        next: (data: any) => {
          this.movieData = data;

          // Buscar classificação indicativa
          this.getClassificacao(movieId).subscribe((res: any) => {
            const br = res.results.find((r: any) => r.iso_3166_1 === 'BR');
            this.movieData.classificacao = br 
              ? br.release_dates[0].certification || 'Sem' 
              : 'Sem';
          });

          console.log('Dados do filme carregados:', this.movieData);
        },
        error: err => console.error('Erro ao buscar detalhes do filme:', err)
      });
    }
  }

  // Método para buscar classificação
  getClassificacao(filmeId: string) {
    const url = `https://api.themoviedb.org/3/movie/${filmeId}/release_dates?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get(url);
  }
}

