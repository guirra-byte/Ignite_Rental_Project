import { v4 as uuidV4 } from 'uuid';
import { ICreateUserDTO } from '../Services/Data/ICreateUserDTO';


export class User {

  id?: string
  name: string
  username: string
  password: string
  email: string
  driver_license: string
  isAdmin: boolean
  created_at?: Date
  avatar?: string

  constructor(props: ICreateUserDTO, id?: string, isAdmin = false) {

    const newObject: ICreateUserDTO = {

      name: props.name,
      username: props.username,
      password: props.password,
      email: props.email,
      driver_license: props.driver_license,
      isAdmin: isAdmin,
      created_at: new Date(),
      avatar: props.avatar,
      id: id ?? uuidV4()
    }

    Object
      .assign(this, newObject);

  }
}