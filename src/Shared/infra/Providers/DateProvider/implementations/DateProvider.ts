import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs
  .extend(utc);

export class DateProvider implements IDateProvider {

  async compareInHour(end_date_return: Date): Promise<number> {

    // ---- Formatação do Expect Return Date ----
    const expectReturnDateFormat = dayjs(end_date_return)
      .utc()
      .local()
      .format();

    // ---- ** ----

    // ---- Formatação do Date Now() - Data Atual ----
    const startDate = dayjs()
      .utc()
      .local()
      .format();

    // ---- ** ----

    // ---- Implementação da comparação de Dates
    // - Para ser mais exato isso é apenas a subtração entre as Dates ---- 

    const compareDates: number = dayjs(expectReturnDateFormat)
      .diff(startDate, "hours");

    // ---- ** ----

    // ---- Return na diferença entre as Dates ---- 
    return compareDates;
    // ---- ** ----

  }

  async compareInDays(start_date: Date, end_date: Date): Promise<number> {

    const startDateFormat = dayjs(start_date)
      .utc()
      .local()
      .format();

    const endDateFormat = dayjs(end_date)
      .utc()
      .local()
      .format();

    const compareDates = dayjs(endDateFormat)
      .diff(startDateFormat, "days");

    return compareDates;
  }

  async dateNow(): Promise<Date> {

    const now: Date = dayjs()
      .utc()
      .local().toDate();

    return now;
  }

  async replaceToUTC(date: Date): Promise<string> {

    const replaceDateToUTCFormat = dayjs(date)
      .utc()
      .local()
      .format();

    return replaceDateToUTCFormat;
  }

  async addDays(days: number): Promise<Date> {

    const addDays: Date = dayjs()
      .add(days, "days")
      .toDate();

    return addDays;
  }

  async addHours(hours: number): Promise<Date> {

    const addHours: Date = dayjs()
      .add(hours, "hours")
      .toDate();

    return addHours;
  }
}