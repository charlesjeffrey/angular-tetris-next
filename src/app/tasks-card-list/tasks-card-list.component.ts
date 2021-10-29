import { Task } from './../model/task';
import { TasksService } from './../services/tasks.service';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  private tasksChanged = new EventEmitter();

  constructor(private dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit(): void {
  }


  editTask(task: Task) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = task;

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.tasksChanged.emit())
      )
      .subscribe(
        //Not Working
        val => console.log("Dialog output:", val)
      );
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task.id, task)
  }

  createTask() {
    this.tasksService.createTask()
  }

}
