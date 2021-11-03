import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsFiltersComponent } from './tv-shows-filters.component';

describe('TvShowsFiltersComponent', () => {
  let component: TvShowsFiltersComponent;
  let fixture: ComponentFixture<TvShowsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
