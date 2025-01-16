import { Schema, model } from 'mongoose';

export interface ITodo {
  title: string;
  description: string;
  isCompleted: boolean;
  todoList: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  creeatedAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    todoList: { type: Schema.Types.ObjectId, ref: 'TodoList', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default model<ITodo>('Todo', TodoSchema);
