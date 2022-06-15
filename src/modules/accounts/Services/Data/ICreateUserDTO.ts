
export interface ICreateUserDTO {

  name: string
  username: string
  email: string
  password: string
  driver_license: string
  id?: string
  avatar?: string
  isAdmin?: boolean
  created_at?: Date
}