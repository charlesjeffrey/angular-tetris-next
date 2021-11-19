import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, timer } from "rxjs";
import { IWeather } from '../model/weather';
import { catchError, delayWhen, filter, map, retryWhen, startWith, switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'd4f2c452bb1f43f8c07d9f3f7c57c76d';
  private weatherUrl = '//api.openweathermap.org/data/2.5/weather?zip=34668,us&units=imperial&appid=' + this.apiKey;

  private subject = new BehaviorSubject<IWeather>({
    coord: [],
    weather: [],
    base: "",
    main: [],
    visibility: 0,
    wind: [],
    rain: [],
    clouds: [],
    dt: 0,
    sys: [],
    timezone: 0,
    id: 0,
    name: "",
    cod: 0,
  });

  private fetchInterval = 300000;

  public weather$: Observable<IWeather> = this.subject.asObservable();

  constructor(private http: HttpClient) {
    console.log(`Interval set to ${this.fetchInterval} (${this.fetchInterval / 60000} mins)`)
  }

  init() {
    const now = new Date();
    this.http.get<IWeather>(this.weatherUrl).pipe(
      retryWhen(errors => errors.pipe(
        tap(() => console.log(`Error loading weather occurred at ${now.toLocaleTimeString()}, retrying in 20 seconds.`)),
        delayWhen(() => timer(20000))
      ))
    )
      .subscribe(
        weather => this.subject.next(weather)
      )
    console.log(`HTTP request sucessful at ${now.toLocaleTimeString()}. Next update at ${new Date(now.getTime() + this.fetchInterval).toLocaleTimeString()}.`);
  }

  getCurrentWeather() {
    setInterval(() => this.init(), this.fetchInterval);
  }
}
