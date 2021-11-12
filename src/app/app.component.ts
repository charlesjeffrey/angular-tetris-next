import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private tasksService: TasksService, private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.tasksService.init();
    this.weatherService.init();
  }

}
