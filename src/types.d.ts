export interface Locals {
  title: string;
  sessionToken: string;
  userName: string;
  userId: string;
}

export interface Events {
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  _id: string;
  title: string;
  assistants: string[];
  createdBy: string;
}

export interface DayEvents {
  day: number;
  events: Events[];
  _id: string;
}