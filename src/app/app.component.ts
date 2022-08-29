import { Component, OnInit } from '@angular/core';
import { countrieService } from './app.service';
import { Observable } from 'rxjs';
import { Country } from 'src/models/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected countries$!: Observable<Country[]>;
  constructor(private countrieService: countrieService) { }

  ngOnInit() {
    this.countries$ = this.countrieService.getCountriesCoords();
  }

  protected showInformation(pin: Country): void {
    console.log(pin);
  }

}
