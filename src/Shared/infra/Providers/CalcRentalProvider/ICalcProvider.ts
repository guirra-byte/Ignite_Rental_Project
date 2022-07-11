

export interface ICalcProvider {

  resolve(daily_rate: number, return_date: Date): Promise<number>
}