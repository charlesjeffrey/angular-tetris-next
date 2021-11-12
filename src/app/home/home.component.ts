import { Component, OnInit } from '@angular/core';
import { ITask } from "../model/task";
import { Observable } from "rxjs";
import { TasksService } from "../services/tasks.service";
import { IWeather } from '../model/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  lateTasks$!: Observable<ITask[]>;
  todayTasks$!: Observable<ITask[]>;
  sevenDaysTasks$!: Observable<ITask[]>;
  thirtyDaysTasks$!: Observable<ITask[]>;
  weeklyTasks$!: Observable<ITask[]>;
  dailyTasks$!: Observable<ITask[]>;
  onceTasks$!: Observable<ITask[]>;
  monthlyTasks$!: Observable<ITask[]>;
  yearlyTasks$!: Observable<ITask[]>;
  customTasks$!: Observable<ITask[]>;

  weather$!: Observable<IWeather>;


  constructor(private tasksService: TasksService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.lateTasks$ = this.tasksService.selectLateTasks();
    this.todayTasks$ = this.tasksService.selectTodayTasks();
    this.sevenDaysTasks$ = this.tasksService.selectSevenDaysTasks();
    this.thirtyDaysTasks$ = this.tasksService.selectThirtyDaysTasks();
    this.dailyTasks$ = this.tasksService.selectDailyTasks();
    this.weeklyTasks$ = this.tasksService.selectWeeklyTasks();
    this.onceTasks$ = this.tasksService.selectOnceTasks();
    this.monthlyTasks$ = this.tasksService.selectMonthlyTasks();
    this.yearlyTasks$ = this.tasksService.selectYearlyTasks();
    this.customTasks$ = this.tasksService.selectCustomTasks();

    this.weather$ = this.weatherService.weather$;

    this.weatherService.getCurrentWeather();

  }

}
