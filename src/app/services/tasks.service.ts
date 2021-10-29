import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../model/task";
import { catchError, filter, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { isToday, addWeeks, isWithinInterval, subDays, addMonths, isBefore, addDays } from "date-fns";

@Injectable()
export class TasksService {
  private tasksUrl = '/api/tasks';
  private subject = new BehaviorSubject<Task[]>([]);

  public tasks$: Observable<Task[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService) { }

  init() {
    this.http.get<Task[]>(this.tasksUrl)
      .subscribe(
        tasks => this.subject.next(tasks)
      );

  }

  createTask() {

  }

  saveTask(taskId: number, changes: Task): Observable<any> {
    const tasks = this.subject.getValue();
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    const newTasks = tasks.slice(0);

    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      ...changes
    };

    this.subject.next(newTasks);

    return fromPromise(fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  deleteTask(taskId: number, changes: Task): Observable<any> {
    const tasks = this.subject.getValue();
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    const newTasks = tasks.slice(0);

    changes.isDeleted = true;

    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      ...changes
    };

    this.subject.next(newTasks);

    return fromPromise(fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  selectLateTasks() {
    const today = new Date();

    return this.tasks$.pipe(
      map(tasks => tasks
        .filter(task => (isBefore(new Date(task.dueDate), today))))
    );
  }

  selectTodayTasks() {
    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => (isToday(new Date(task.dueDate)) == true) && task.isDeleted == false))
      );
  }

  selectSevenDaysTasks() {
    const yesterday = subDays(new Date(), 1);
    const seven_days = new Date(addWeeks(new Date(), 1))

    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => (isWithinInterval(new Date(task.dueDate), { start: yesterday, end: seven_days }) == true)
          )
        )
      );
  }

  selectThirtyDaysTasks() {
    const yesterday = subDays(new Date(), 1);
    const thirty_days = new Date(addMonths(new Date(), 1))

    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => (isWithinInterval(new Date(task.dueDate), { start: yesterday, end: thirty_days }) == true)))
      );
  }
  // isBefore(new Date(task.dueDate), addWeek(new Date(task.dueDate), 1) == true
  selectDailyTasks() {
    return this.filterBySchedule('daily');
  }

  selectWeeklyTasks() {
    return this.filterBySchedule('weekly');
  }

  selectOnceTasks() {
    return this.filterBySchedule('once');
  }

  selectMonthlyTasks() {
    return this.filterBySchedule('monthly');
  }

  selectYearlyTasks() {
    return this.filterBySchedule('yearly');
  }

  selectCustomTasks() {
    return this.filterBySchedule('custom');
  }

  filterBySchedule(schedule: string) {
    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => task.schedule == schedule && task.isDeleted == false)),
      );
  }

  findTaskById(taskId: number): Observable<Task[]> {
    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => task.id == taskId)),
        filter(task => !!task)
      );
  }

}
