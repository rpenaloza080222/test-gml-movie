import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrendComponent } from './movie-trend.component';

describe('MovieTrendComponent', () => {
  let component: MovieTrendComponent;
  let fixture: ComponentFixture<MovieTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
