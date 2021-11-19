import { ITask } from './../model/task';
import { TasksService } from './../services/tasks.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-tasks-card-list',
  templateUrl: './tasks-card-list.component.html',
  styleUrls: ['./tasks-card-list.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCardListComponent implements OnInit {

  @Input()
  tasks: any;

  @Output()
  private taskChanged = new EventEmitter();

  constructor(private dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit(): void { }


  completeTask(task: ITask) {

    console.log("task.isRecurring: " + task.isRecurring);

    task.isRecurring ? this.tasksService.createRecurringTask(task) : this.tasksService.deleteTask(task.id);

  }


  viewTask(task: ITask) {

  }

  editTask(task: ITask) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = task;

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
    //    //filter(val => !!val),
        tap(() => console.log("Dialog closing...")),
        tap(() => this.taskChanged.emit())
      )
      .subscribe(
        //Not Working Update: filter(val => !!val) causing problems.
        //val => console.log("Dialog output:", val)
      );
  }

  deleteTask(task: ITask) {
    this.tasksService.deleteTask(task.id)
  }

  createTask() {
    const dialogConfig = new MatDialogConfig();

    let fillerTask: ITask = {
      id: "",
      category: "",
      title: "",
      releasedAt: new Date,
      notes: "",
      schedule: "",
      isDeleted: false,
      dueDate: new Date,
      isDueToday: false,
      startWeekday: "",
      endWeekday: "",
      startDate: new Date,
      endDate: new Date,
      startHour: "",
      endHour: "",
      startMonth: "",
      endMonth: "",
      startYear: "",
      endYear: "",
      isLate: false,
      isNew: true,
      isComplete: false,
      isRecurring: true
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = fillerTask;

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        //filter(val => !!val),
        tap(() => console.log("Dialog closed...")),
        tap(() => this.taskChanged.emit())
      )
      .subscribe(
        //Not Working
        //val => console.log("Dialog output:", val)
      );
  }

}
