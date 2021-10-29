export interface Task {
  id: number;
  category: string;
  title: string;
  releasedAt: Date;
  notes: string;
  schedule: string;
  isDeleted: boolean;
  dueDate: Date;
  isDueToday: false;
  startWeekday: string;
  endWeekday: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  startMonth: string;
  endMonth: string;
  startYear: string;
  endYear: string;
  isLate: boolean;
}
