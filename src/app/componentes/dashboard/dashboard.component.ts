import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  termoBusca: string = "";

  // Array do carrossel
  carouselImages = [
    { src: '/img/animes/C-DeathNote.png', alt: 'Death Note' },
    { src: '/img/animes/C-OnePiece.png', alt: 'One Piece' },
    { src: '/img/animes/C-SPYxFAMILY.png', alt: 'SPY x FAMILY' },
    { src: '/img/filmes/C-aSubstancia.png', alt: 'A Substância' },
    { src: '/img/filmes/C-CisneNegro.png', alt: 'Cisne Negro' },
    { src: '/img/filmes/C-Corra.png', alt: 'Corra!' },
    { src: '/img/series/C-Round6.png', alt: 'Round 6' },
    { src: '/img/series/C-StrangerThings.png', alt: 'Stranger Things' },
    { src: '/img/series/C-TodoMundoOdeiaoChris.png', alt: 'Todo Mundo Odeia o Chris' },
    { src: '/img/jogos/C-Celeste.png', alt: 'Celeste' },
    { src: '/img/jogos/C-GRIS.png', alt: 'GRIS' },
    { src: '/img/jogos/C-HollowKnight.png', alt: 'Hollow Knight' },
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    // troca a cada 3 segundos
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000);
  }

  goToSlide(index: number) { this.currentIndex = index; }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  // Arrays originais
  filmes = [
    { titulo: 'A Substância', poster: '/img/filmes/aSubstancia.png', genero: 'Terror' },
    { titulo: 'Corra!', poster: '/img/filmes/Corra.png', genero: 'Suspense' },
    { titulo: 'Cisne Negro', poster: '/img/filmes/CisneNegro.png', genero: 'Drama' },
    { titulo: 'It: A Coisa', poster: '/img/filmes/ITacoisa1.png', genero: 'Terror' },
    { titulo: 'It: A Coisa, Capitulo 2', poster: '/img/filmes/ITacoisa2.png', genero: 'Terror' },
    { titulo: 'Histórias Cruzadas', poster: '/img/filmes/HistoriasCruzadas.png', genero: 'Drama' },
    { titulo: 'Que Mal Eu Fiz a Deus?', poster: '/img/filmes/QueMalEuFizaDeus1.png', genero: 'Comédia' },
    { titulo: 'Que Mal Eu Fiz a Deus 2?', poster: '/img/filmes/QueMalEuFizaDeus2.png', genero: 'Comédia' }
  ];

  series = [
    { titulo: 'Orange is the New Black', poster: '/img/series/OrangeIsTheNewBlack.png', genero: 'Drama' },
    { titulo: 'Adolescência', poster: '/img/series/Adolescencia.png', genero: 'Drama' },
    { titulo: 'Stranger Things', poster: '/img/series/StrangerThings.png', genero: 'Suspense' },
    { titulo: 'Round 6', poster: '/img/series/Round6.png', genero: 'Thriller' },
    { titulo: 'Black Mirror', poster: '/img/series/BlackMirror.png', genero: 'Ficção científica' },
    { titulo: 'Todo Mundo Odeia o Chris', poster: '/img/series/TodoMundoOdeiaoChris.png', genero: 'Comédia' },
    { titulo: 'One Piece', poster: '/img/series/OnePieceserie.png', genero: 'Aventura' },
    { titulo: 'The Bear', poster: '/img/series/oUrso.png', genero: 'Drama' }
  ];

  animes = [
    { titulo: 'Zoom 100', poster: '/img/animes/Zoom100.png', genero: 'Ação' },
    { titulo: 'Death Note', poster: '/img/animes/DeathNote.png', genero: 'Suspense' },
    { titulo: 'One Piece', poster: '/img/animes/OnePiece.png', genero: 'Aventura' },
    { titulo: 'SPY X FAMILY', poster: '/img/animes/SPYxFAMILY.png', genero: 'Comédia/Ação' },
    { titulo: 'Demon Slayer', poster: '/img/animes/DemonSlayer.png', genero: 'Ação' },
    { titulo: 'Hunter x Hunter', poster: '/img/animes/HunterxHunter.png', genero: 'Aventura' },
    { titulo: 'Jujutsu Kaisen', poster: '/img/animes/JujutsuKaisen.png', genero: 'Ação' },
    { titulo: 'Neon Genesis Evangelion', poster: '/img/animes/NeonGenesisEvangelion.png', genero: 'Ficção científica' }
  ];

  jogos = [
    { titulo: 'Hollow Knight', poster: '/img/jogos/HollowKnight.png', genero: 'Metroidvania' },
    { titulo: 'Hollow Knight: Silksong', poster: '/img/jogos/Silksong.png', genero: 'Metroidvania' },
    { titulo: 'The Last of Us Parte 1', poster: '/img/jogos/TheLastofUs1.png', genero: 'Ação' },
    { titulo: 'The Last of Us Parte 2', poster: '/img/jogos/TheLastofUs2.png', genero: 'Ação' },
    { titulo: 'Celeste', poster: '/img/jogos/Celeste.png', genero: 'Plataforma' },
    { titulo: 'GRIS', poster: '/img/jogos/GRIS.png', genero: 'Aventura' },
    { titulo: 'Minecraft', poster: '/img/jogos/Minecraft.png', genero: 'Sandbox' },
    { titulo: 'INSIDE', poster: '/img/jogos/INSIDE.png', genero: 'Puzzle/Plataforma' }
  ];

  // Arrays filtrados que vão aparecer no HTML
  filmesFiltrados = [...this.filmes];
  seriesFiltrados = [...this.series];
  animesFiltrados = [...this.animes];
  jogosFiltrados = [...this.jogos];

  buscar() {
    const termo = this.termoBusca.toLowerCase();

    this.filmesFiltrados = this.filmes.filter(f => f.titulo.toLowerCase().includes(termo));
    this.seriesFiltrados = this.series.filter(s => s.titulo.toLowerCase().includes(termo));
    this.animesFiltrados = this.animes.filter(a => a.titulo.toLowerCase().includes(termo));
    this.jogosFiltrados = this.jogos.filter(j => j.titulo.toLowerCase().includes(termo));
  }
}
