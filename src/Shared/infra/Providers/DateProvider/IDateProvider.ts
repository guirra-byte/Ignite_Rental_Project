import dayjs from "dayjs"

interface IDateProvider {

  compare(end_date_return: Date): Promise<number>
}

export { IDateProvider }

