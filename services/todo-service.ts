import AsyncStorage from '@react-native-async-storage/async-storage';
import {Todo} from '../utils/interfaces/Todo';

export const loadTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);
    const allTodos: Todo[] = [];
    for (const record of data) {
      const recordData = JSON.parse(record[1]!);
      const todo: Todo = {
        id: recordData.id,
        title: recordData.title,
        details: recordData.details,
        dueDate: recordData.dueDate,
        isComplete: recordData.isComplete,
        priority: recordData.priority,
      };
      allTodos.push(todo);
    }
    setTodos(allTodos);
    console.log(allTodos);
  } catch (err) {
    console.error(err);
  }
};
