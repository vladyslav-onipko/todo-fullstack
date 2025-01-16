import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

interface IUser {
  name: string;
  email: string;
  password: string;
  todoLists: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minlength: 6, required: true },
  todoLists: [{ type: Schema.Types.ObjectId, ref: 'TodoList' }],
});

UserSchema.plugin(uniqueValidator);

export default model<IUser>('User', UserSchema);
