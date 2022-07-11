import { Car } from "../model/Car";

export interface ICarRequestProps {

  name: string
  description: string
  daily_rate: number
  available?: boolean
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  specification_id?: string[]

}

export interface ICarRepository {

  createCar(props: ICarRequestProps): Promise<void>
  findOneCar(name: string): Promise<Car>
  findAllCars(): Promise<Car[]>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>
  findById(id: string): Promise<Car>
  replaceAvailable(car_id: string, available: boolean): Promise<Car>

}