import { TasksService } from './../services/tasks.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "../model/task";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { format } from 'date-fns';
import { fromEvent, noop } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import * as moment from 'moment';


@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements AfterViewInit {

  form: FormGroup;

  task: Task;

  @ViewChild('saveButton', { static: true })
  saveButton!: ElementRef;

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) task: Task,
    private tasksService: TasksService) {

    const today = new Date();

    this.task = task;

    this.form = fb.group({
      title: [task.title, Validators.required],
      category: [task.category, Validators.required],
      releasedAt: [today, Validators.required],
      //releasedAt: [moment(), Validators.required],
      notes: [task.notes],
      schedule: [task.schedule, Validators.required],
      isDeleted: [task.isDeleted, Validators.required]
    });

  }

  ngAfterViewInit() {

  }

  delete() {
    this.tasksService.deleteTask(this.task.id, this.form.value)
      .subscribe(
        () => this.close(),
        err => console.log("Error deleting course", err)
      );
  }



  save() {
    this.tasksService.saveTask(this.task.id, this.form.value)
      .subscribe(
        () => this.close(),
        err => console.log("Error saving course", err)
      );
  }


  close() {
    this.dialogRef.close();
  }


}
