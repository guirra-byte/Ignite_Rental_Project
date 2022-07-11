import { specification as Specification } from '../../model/Specification';

export interface ICarRequestPropsDTO {

  name: string,
  description: string
  daily_rate: number
  available?: boolean
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  specification_id?: string[]
}