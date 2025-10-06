import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sobre-filmes',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './sobre-filmes.component.html',
  styleUrls: ['./sobre-filmes.component.css']
})
export class SobreFilmesComponent implements OnInit {
  movieData: any;
  tipo: string = 'filme'; // filme, serie ou anime
  private apiKey: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const tipoParam = this.route.snapshot.paramMap.get('type'); // <--- pegar o parâmetro certo
    this.tipo = tipoParam || 'filme';

    if (id) {
      const url =
        this.tipo === 'filme'
          ? `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=pt-BR`
          : `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=pt-BR`;

      this.http.get(url).subscribe({
        next: (data: any) => {
          this.movieData = data;

          if (this.tipo === 'filme') {
            this.getClassificacao(id).subscribe((res: any) => {
              const br = res.results.find((r: any) => r.iso_3166_1 === 'BR');
              this.movieData.classificacao = br
                ? br.release_dates[0].certification || 'Sem'
                : 'Sem';
            });
          } else {
            this.getSerieClassificacao(id).subscribe((res: any) => {
              const br = res.results.find((r: any) => r.iso_3166_1 === 'BR');
              this.movieData.classificacao = br ? br.rating || 'Sem' : 'Sem';
            });
          }
        },
        error: (err) => console.error('Erro ao buscar detalhes:', err)
      });
    }
  }

  getClassificacao(filmeId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${filmeId}/release_dates?api_key=${this.apiKey}&language=pt-BR`
    );
  }

  getSerieClassificacao(serieId: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/${serieId}/content_ratings?api_key=${this.apiKey}&language=pt-BR`
    );
  }
}

