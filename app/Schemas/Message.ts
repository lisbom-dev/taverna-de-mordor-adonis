import Mongo from '@ioc:CuC/AdonisGoose'
import IMessage from 'Contracts/interfaces/IMessage'

const MessageSchema = new Mongo.Schema<IMessage>(
  {
    boardId: {
      type: Number,
      required: true,
    },
    sender: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default Mongo.model<IMessage>('Message', MessageSchema)
