

import { Request, Response } from 'express';
import { TASKS } from "./db-data";



export function getAllTasks(req: Request, res: Response) {

  res.status(200).json({ payload: Object.values(TASKS) });

}


export function getTaskById(req: Request, res: Response) {

  const taskId = req.params["id"];

  const tasks: any = Object.values(TASKS);

  const task = tasks.find((task: { id: string; }) => task.id == taskId);

  res.status(200).json(task);

}
