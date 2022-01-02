import Mongo from '@ioc:CuC/AdonisGoose'
import INotification from 'Contracts/interfaces/INotification'

const NotificationSchema = new Mongo.Schema<INotification>(
  {
    content: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Number,
      required: true,
    },
    sender: {
      type: Object,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default Mongo.model<INotification>('Notification', NotificationSchema)
