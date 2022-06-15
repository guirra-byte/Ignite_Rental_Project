import { Car } from "../model/Car"

export interface ICarRequestProps {

  name: string
  description: string
  daily_rate: number
  available?: boolean
  license_plate: string
  fine_amount: string
  brand: string

}

export interface ICarRepository {

  createCar(props: ICarRequestProps): Promise<void>
  findOneCar(name: string): Promise<Car>
  findAllCars(): Promise<Car[]>
  findByLicensePlate(license_plate: string): Promise<Car>

}