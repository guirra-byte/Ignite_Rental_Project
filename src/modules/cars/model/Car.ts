import { v4 as uuidV4 } from "uuid";
import { specification as Specification } from './Specification';

import { ICarRequestPropsDTO } from "../Services/Data/ICarRequestPropsDTO";

export class Car {

  name: string
  description: string
  daily_rate: number
  available?: boolean
  license_plate: string
  fine_amount: number
  brand: string
  created_at: Date
  id?: string
  category_id?: string
  specifications?: Specification[]

  constructor(props: ICarRequestPropsDTO, id?: string, available = true) {

    const newObject = {

      name: props.name,
      category_id: props.category_id,
      specification_id: props.specification_id,
      description: props.description,
      daily_rate: props.daily_rate,
      available: available,
      license_plate: props.license_plate,
      fine_amount: props.fine_amount,
      brand: props.brand,
      created_at: new Date(),
      id: id ?? uuidV4()
    }

    Object
      .assign(this, newObject);
  }
}