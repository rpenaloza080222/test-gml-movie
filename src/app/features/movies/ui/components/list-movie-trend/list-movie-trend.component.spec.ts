import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovieTrendComponent } from './list-movie-trend.component';

describe('ListMovieTrendComponent', () => {
  let component: ListMovieTrendComponent;
  let fixture: ComponentFixture<ListMovieTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMovieTrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovieTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
