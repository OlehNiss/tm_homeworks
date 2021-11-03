import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPeople } from 'src/app/models/people.interface';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy{
  public people: IPeople[] = [];
  pages: number[] = [1,2,3,4,5];

  private subs: Subscription = new Subscription();
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.subs = this.peopleService.getPeople()
      .pipe(
        map((people:any) => people.results)
      )
      .subscribe((people: IPeople[]) => {
        this.people = people
    });
  }
  showPeople(){
    console.log(this.people);
  }
  pageClick(page: number): void{
    this.peopleService.getPeople(page)
      .pipe(
        map((people:any) => people.results)
      )
      .subscribe((people: IPeople[]) => {
        this.people = people
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
