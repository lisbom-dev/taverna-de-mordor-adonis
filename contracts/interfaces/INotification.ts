import Board from 'App/Models/Board'
import { Document } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface INotification extends Document {
  ownerId: number
  sender: Board
  subject: string
  content: string
  photoUrl?: string
  read: boolean
}
