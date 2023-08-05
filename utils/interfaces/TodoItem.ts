import {Todo} from './Todo';

export interface TodoItem extends Todo {
  handleMarkComplete: Function;
  handleDeleteTodo: Function;
}
