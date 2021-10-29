import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    this.tasksService.init();
  }

}
