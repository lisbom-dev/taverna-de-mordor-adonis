import User from 'App/Models/User'
import { Document } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IMessage extends Document {
  sender: User
  content: string
  boardId: number
}
