export interface ITask {
  id: any;
  category: string;
  title: string;
  releasedAt: Date;
  notes: string;
  schedule: string;
  isDeleted: boolean;
  dueDate: Date;
  isDueToday: boolean;
  startWeekday: string;
  endWeekday: string;
  startDate: Date;
  endDate: Date;
  startHour: string;
  endHour: string;
  startMonth: string;
  endMonth: string;
  startYear: string;
  endYear: string;
  isLate: boolean;
  isNew: boolean;
  isComplete: boolean;
  isRecurring: boolean;
}
