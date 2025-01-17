import { Schema, model } from 'mongoose';

export interface ITodoList {
  name: string;
  todos: Schema.Types.ObjectId[];
  creator: Schema.Types.ObjectId;
  viewers: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TodoListSchema = new Schema<ITodoList>(
  {
    name: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default model<ITodoList>('TodoList', TodoListSchema);
