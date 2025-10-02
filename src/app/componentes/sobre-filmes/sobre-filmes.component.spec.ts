import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreFilmesComponent } from './sobre-filmes.component';

describe('SobreFilmesComponent', () => {
  let component: SobreFilmesComponent;
  let fixture: ComponentFixture<SobreFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreFilmesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
