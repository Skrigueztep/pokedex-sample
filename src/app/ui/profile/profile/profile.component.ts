import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public statistics: { technology: string; level: number; }[];

  constructor() {
    this.statistics = [
      { technology: 'Angular', level: 80 },
      { technology: 'HTML', level: 80 },
      { technology: 'CSS', level: 80 },
      { technology: 'Typescript', level: 30 },
      { technology: 'NodeJS', level: 30 },
      { technology: 'Wordpress', level: 10 },
      { technology: 'PHP', level: 10 },
      { technology: 'JQuery', level: 10 },
    ];
  }

  ngOnInit(): void {
  }

}
