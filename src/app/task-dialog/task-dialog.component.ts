import { TasksService } from './../services/tasks.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ITask } from "../model/task";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { format } from 'date-fns';
import { fromEvent, noop } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements AfterViewInit {
  form: FormGroup;
  task: ITask;

  @ViewChild('saveButton', { static: true })
  saveButton!: ElementRef;

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  events: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) task: ITask,
    private tasksService: TasksService) {

    const today = new Date();

    this.task = task;
    this.form = fb.group({

      id: [task.id],
      title: [task.title, Validators.required],
      startDate: [task.startDate, Validators.required],
      endDate: [task.endDate, Validators.required],
      category: [task.category, Validators.required],
      releasedAt: [today, Validators.required],
      //releasedAt: [moment(), Validators.required],
      notes: [task.notes],
      schedule: [task.schedule, Validators.required],
      isDeleted: [task.isDeleted, Validators.required]

    });

  }

  //showSave: boolean = false;

  ngAfterViewInit() {

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  save() {
    this.tasksService.saveTask(this.form.value).pipe(
      tap(() => console.log("Saving edited task..."))
    )
      .subscribe(
        () => this.close(),
        err => console.log("Error saving course", err)
      );
  }

  create() {
    this.tasksService.createTask(this.form.value).pipe(
      tap(() => console.log("Creating new task..."))
    )
      .subscribe(
        () => this.close(),
        err => console.log("Error saving course", err)
      );

  }

  close() {
    this.dialogRef.close();
  }

}
