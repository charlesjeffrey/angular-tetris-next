
import * as express from 'express';
import { Application } from "express";
import { getAllTasks, getTaskById } from "./get-tasks.route";
//import { searchLessons } from "./search-lessons.route";


const app: Application = express();


app.route('/api/tasks').get(getAllTasks);

app.route('/api/tasks/:id').get(getTaskById);

//app.route('/api/lessons').get(searchLessons);




const httpServer: any = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
  return true;
});




