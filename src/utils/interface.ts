export interface ISigIn {
  email: string
  password: string
}

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  role: string | undefined
}