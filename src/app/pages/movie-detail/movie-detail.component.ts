import { Movie } from '@/features/movies/domain/interfaces/Movie';
import { MoviesRepositoryImpl } from '@/features/movies/infrastructure/repositories/movies.repository.impl';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  
  providers: [MoviesRepositoryImpl],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _movieService = inject(MoviesRepositoryImpl)
  id = signal<number>(0)
  movie = signal<Movie | undefined>(undefined)

  getBackdropUrl(){
    const url = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${
      this.movie()?.backdrop_path
    }`;
    console.log('Url Image', url);
    return url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if(params["id"]){
        this.id.set(Number(params["id"]))
        this.getMovieDetail()
      }
    })
  }

  getMovieDetail(){
    this._movieService.getMovieById(this.id())
    .subscribe(res => {
      if(res){
        console.log("Movie", res)
        this.movie.set(res)
      }
    })
  }
}
