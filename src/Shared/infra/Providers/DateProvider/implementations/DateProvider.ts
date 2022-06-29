import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs
  .extend(utc);

export class DateProvider implements IDateProvider {

  async compare(end_date_return: Date): Promise<number> {

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
    // - Comparação da subtração entre as Datas ---- 

    const compareDates: number = dayjs(expectReturnDateFormat)
      .diff(startDate);
    // ---- ** ----

    // ---- Return na diferença entre as Dates ---- 
    return compareDates;
    // ---- ** ----

  }
}