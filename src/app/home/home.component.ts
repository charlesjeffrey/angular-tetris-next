import { Component, OnInit } from '@angular/core';
import { Task } from "../model/task";
import { Observable } from "rxjs";
import { TasksService } from "../services/tasks.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lateTasks$!: Observable<Task[]>;
  todayTasks$!: Observable<Task[]>;
  sevenDaysTasks$!: Observable<Task[]>;
  thirtyDaysTasks$!: Observable<Task[]>;
  weeklyTasks$!: Observable<Task[]>;
  dailyTasks$!: Observable<Task[]>;
  onceTasks$!: Observable<Task[]>;
  monthlyTasks$!: Observable<Task[]>;
  yearlyTasks$!: Observable<Task[]>;
  customTasks$!: Observable<Task[]>;

  constructor(private tasksService: TasksService) { }

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
  }
}
