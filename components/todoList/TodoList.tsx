import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './todoList.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@react-native-material/core';
import {Todo} from '../../utils/interfaces/Todo';
import DialogComponent from '../dialog/dialogComponent';
const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Todo');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleDismiss = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      const allTodos: Todo[] = [];
      for (const record of data) {
        const recordData = JSON.parse(record[1]!);
        console.log('record: ', recordData);
        const todo: Todo = {
          id: recordData.id,
          value: recordData.value,
          dueDate: recordData.dueDate,
          isComplete: recordData.isComplete,
        };
        if (recordData.isComplete) {
          completedTodos.push(recordData);
        }
        allTodos.push(todo);
      }
      setTodos(allTodos);
      console.log(allTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTodo = async (todo: any): Promise<void> => {
    console.log('adding...');
    const newID = todos.length + 1;
    console.log(todo);
    if (!todo) {
      handleDismiss();
      return;
    }
    const newTodo: Todo = {
      id: newID,
      value: todo[0],
      dueDate: todo[1],
      isComplete: false,
    };
    try {
      await AsyncStorage.setItem(`${newID}`, JSON.stringify(newTodo), () => {
        console.log(
          `successfully saved todo with id ${newID} with details of ${newTodo}`,
        );
      });
    } catch (err) {
      throw err;
    }
    todos.push(newTodo);
    setShowDialog(false);
  };

  const handleEditTodo = async (newTodo: any): Promise<void> => {
    console.log('editing...');
    const todoIndex = todos.findIndex(todo => todo.id === selectedTodo!.id);
    todos[todoIndex] = {
      ...todos[todoIndex],
      value: newTodo[0],
      dueDate: newTodo[1],
      isComplete: newTodo[2],
    };
    try {
      await AsyncStorage.setItem(
        `${selectedTodo!.id}`,
        JSON.stringify(todos[todoIndex]),
        () => {
          console.log(
            `successfully saved todo with id ${
              selectedTodo!.id
            } with details of ${newTodo}`,
          );
        },
      );
    } catch (err) {
      throw err;
    }
    setShowDialog(false);
  };

  const handleDeleteTodo = async (todoID: number): Promise<void> => {
    console.log('deleting...');
    const newTodos = todos.filter(todo => todo.id !== todoID);
    setTodos(newTodos);
    try {
      await AsyncStorage.removeItem(`${todoID}`, () => {
        console.log(`successfully removed todo with ID ${todoID}`);
      });
    } catch (err) {
      throw err;
    }
  };

  const handleMarkComplete = async (todo: Todo) => {
    const todoIndex = todos.findIndex(
      currentTodo => currentTodo.id === todo!.id,
    );
    const completedTodo: Todo = {
      id: todo.id,
      value: todo.value,
      dueDate: todo.dueDate,
      isComplete: !todo.isComplete,
    };
    if (completedTodo.isComplete) {
      completedTodos.push(todo);
    } else {
      const newCompletedTodos = completedTodos.filter(
        newTodo => newTodo.id !== todo.id,
      );
      setCompletedTodos(newCompletedTodos);
      console.log(completedTodos);
    }
    let newTodos: Todo[] = [...todos];
    newTodos[todoIndex] = completedTodo;
    setTodos(newTodos);
    try {
      await AsyncStorage.setItem(
        `${todo!.id}`,
        JSON.stringify(todos[todoIndex]),
        () => {
          console.log(
            `successfully saved todo with id ${todo!.id} with details of`,
            todo,
          );
        },
      );
    } catch (err) {
      throw err;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.header}>Todo: </Text>
          <View style={styles.todoList}>
            {todos && todos.length > 0 ? (
              todos.map(todo => {
                return (
                  !todo.isComplete && (
                    <View style={styles.todoItem} key={todo.id}>
                      <TouchableOpacity
                        style={styles.todoLeft}
                        onPress={() => handleMarkComplete(todo)}>
                        <Text style={styles.button}> {'\u2713'} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDialogTitle(`Edit Todo #${todo.id}`);
                          setShowDialog(true);
                          setSelectedTodo(todo);
                        }}
                        style={styles.todoCenter}>
                        <Text style={styles.todoText} numberOfLines={2}>
                          {'\u2022'} {todo.value}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={styles.button}
                        onPress={() => {
                          handleDeleteTodo(todo.id);
                        }}>
                        X
                      </Text>
                    </View>
                  )
                );
              })
            ) : (
              <View>
                <Text style={styles.todoPrompt}>
                  Hooray! You have nothing left to do... To get started, you can
                  add a new todo...
                </Text>
              </View>
            )}
          </View>
          <View style={styles.todoList}>
            {todos &&
              todos.length > 0 &&
              todos.map(todo => {
                <Text style={styles.header}>Completed: </Text>;
                return (
                  todo.isComplete && (
                    <View style={styles.todoItem} key={todo.id}>
                      <TouchableOpacity
                        style={styles.todoLeft}
                        onPress={() => handleMarkComplete(todo)}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          handleMarkComplete(todo);
                        }}
                        style={styles.todoCenter}>
                        <Text style={styles.completedTodo} numberOfLines={2}>
                          {'\u2022'} {todo.value}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                );
              })}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Add Todo'}
              color="dodgerblue"
              onPress={() => {
                setShowDialog(true);
                setSelectedTodo(undefined);
                setDialogTitle(`Add Todo #${todos.length + 1}`);
              }}
            />
          </View>
        </View>
        {showDialog && (
          <DialogComponent
            title={dialogTitle}
            onSubmit={selectedTodo ? handleEditTodo : handleAddTodo}
            onDismiss={handleDismiss}
            selectedTodo={selectedTodo}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoList;
