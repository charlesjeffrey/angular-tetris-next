import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { ITask } from "../model/task";
import { catchError, filter, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { isToday, addWeeks, isWithinInterval, subDays, addMonths, isBefore, addDays } from "date-fns";

@Injectable()
export class TasksService {
  private tasksUrl = '/api/tasks/';
  private subject = new BehaviorSubject<ITask[]>([]);

  public tasks$: Observable<ITask[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService) { }

  init() {
    this.http.get<ITask[]>(this.tasksUrl).pipe(
      catchError(err => {
        console.log("Task loading failed: ", err);
        return throwError(err);
      }
      ))
      .subscribe(
        tasks => this.subject.next(tasks)
      );
  }

  saveTask(changes: ITask): Observable<any> {
    const tasks = this.subject.getValue();
    const taskIndex = tasks.findIndex(task => task.id == changes.id);
    const newTasks = tasks.slice(0);

    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      ...changes
    };

    this.subject.next(newTasks);

    return fromPromise(fetch(`${this.tasksUrl + changes.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  createTask(task: ITask): Observable<any> {
    fromPromise(fetch(`${this.tasksUrl}`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }));

    this.init();

    //I need to return an Observable here for the Dialog to close itself. so, which one?
    //Isn't this one of of's main uses ? I need an obs, here's a fresh one.
    return of(1);

  }

  deleteTask(changes: ITask): Observable<any> {
    const tasks = this.subject.getValue();
    const taskIndex = tasks.findIndex(task => task.id == changes.id);
    const newTasks = tasks.slice(0);

    changes.isDeleted = true;

    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      ...changes
    };

    this.subject.next(newTasks);

    return fromPromise(fetch(`${this.tasksUrl + changes.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));


  }

  selectLateTasks() {
    const today = new Date();
    console.log(this.tasks$)
    return this.tasks$.pipe(
      map(tasks => tasks
        .filter(task => (isBefore(new Date(task.endDate), today)) && !task.isDeleted))
    );
  }

  selectTodayTasks() {
    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => ((isToday(new Date(task.dueDate)) || task.schedule == "daily") && !task.isDeleted))
        )
      );
  }

  selectSevenDaysTasks() {
    const yesterday = subDays(new Date(), 1);
    const seven_days = new Date(addWeeks(new Date(), 1))

    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => (isWithinInterval(new Date(task.dueDate), { start: yesterday, end: seven_days }))
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
          .filter(task => (isWithinInterval(new Date(task.dueDate), { start: yesterday, end: thirty_days }))))
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
          .filter(task => task.schedule == schedule && !task.isDeleted)),
      );
  }

  findTaskById(taskId: number): Observable<ITask[]> {
    return this.tasks$
      .pipe(
        map(tasks => tasks
          .filter(task => task.id == taskId)),
        filter(task => !!task)
      );
  }

}
