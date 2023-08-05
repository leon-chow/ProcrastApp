import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {styles} from './todoList.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@react-native-material/core';
import {Todo} from '../../utils/interfaces/Todo';
import DialogComponent from '../dialog/dialogComponent';
import {loadTodos} from '../../services/todo-service';
import {Priority} from '../../utils/enums/Priority';

const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Todo');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const handleDismiss = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    loadTodos(setTodos);
  }, []);

  useMemo(() => {
    todos.sort((a, b) =>
      a.priority === b.priority ? b.id - a.id : b.priority - a.priority,
    );
    console.log('sorting...');
  }, [todos]);

  const handleAddTodo = async (todo: any): Promise<void> => {
    console.log('adding...');
    let newID = Math.floor(Math.random() * 1000000);
    while (todos.some(t => t.id === newID)) {
      newID = Math.floor(Math.random() * 1000000);
    }
    if (!todo) {
      handleDismiss();
      return;
    }
    const newTodo: Todo = {
      id: newID,
      title: todo.title,
      details: todo.details,
      dueDate: todo.dueDate,
      priority: todo.priority,
      isComplete: todo.isComplete,
    };
    console.log(newID);
    console.log(newTodo);
    try {
      await AsyncStorage.setItem(`${newID}`, JSON.stringify(newTodo), () => {
        console.log(
          `successfully saved todo with id ${newID} with details of ${newTodo}`,
        );
      });
    } catch (err) {
      throw err;
    }
    let newTodos: Todo[] = [...todos];
    newTodos.push(newTodo);
    setTodos(newTodos);
    setShowDialog(false);
  };

  const handleEditTodo = async (newTodo: Todo): Promise<void> => {
    console.log(newTodo);
    console.log('editing...');
    const todoIndex = todos.findIndex(todo => todo.id === selectedTodo!.id);
    const editedTodo: Todo = {
      id: todoIndex,
      title: newTodo.title,
      details: newTodo.details,
      dueDate: newTodo.dueDate,
      priority: newTodo.priority,
      isComplete: newTodo.isComplete,
    };
    let newTodos: Todo[] = [...todos];
    newTodos[todoIndex] = editedTodo;
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
    setTodos(newTodos);
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
      currentTodo => currentTodo.id === todo.id,
    );
    const completedTodo: Todo = {
      id: todo.id,
      title: todo.title,
      details: todo.details,
      dueDate: todo.dueDate,
      isComplete: !todo.isComplete,
      priority: todo.priority,
    };
    let newTodos: Todo[] = [...todos];
    newTodos[todoIndex] = completedTodo;
    setTodos(newTodos);
    try {
      await AsyncStorage.setItem(
        `${todo.id}`,
        JSON.stringify(newTodos[todoIndex]),
        () => {
          console.log(
            `successfully saved todo with id ${completedTodo.id} with details of`,
            completedTodo,
          );
        },
      );
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={styles.container}>
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
      <ScrollView
        style={styles.todoList}
        contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.header}>Todo: </Text>
        {todos &&
        todos.length > 0 &&
        todos.some(todo => todo.isComplete !== true) ? (
          todos.map(todo => {
            return (
              !todo.isComplete && (
                <View style={styles.todoItem} key={todo.id}>
                  <TouchableOpacity
                    onPress={() => {
                      setDialogTitle(
                        `Edit Todo #${
                          todos.findIndex(newTodo => newTodo.id === todo.id) + 1
                        }`,
                      );
                      setShowDialog(true);
                      setSelectedTodo(todo);
                    }}>
                    <Text style={styles.todoTitle} numberOfLines={1}>
                      {todo.title}
                    </Text>
                    <Text style={styles.todoText} numberOfLines={2}>
                      {todo.details}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.todoCenter}>
                    <TouchableOpacity
                      style={styles.todoLeft}
                      onPress={() => handleMarkComplete(todo)}>
                      <Text style={styles.button}> {'\u2713'} </Text>
                    </TouchableOpacity>
                    <Text style={styles.todoText}>
                      Priority: {Priority[todo.priority]}
                    </Text>
                    <Text
                      style={[styles.button, styles.todoRight]}
                      onPress={() => {
                        handleDeleteTodo(todo.id);
                      }}>
                      X
                    </Text>
                  </View>
                </View>
              )
            );
          })
        ) : (
          <View>
            <Text style={styles.todoPrompt}>
              Hooray! You have nothing left to do... To get started, you can add
              a new todo...
            </Text>
          </View>
        )}
        {todos && todos.some(newTodo => newTodo.isComplete) && (
          <Text style={styles.header}>Completed: </Text>
        )}
        {todos &&
          todos.length > 0 &&
          todos.map(todo => {
            return (
              todo.isComplete && (
                <TouchableOpacity
                  style={styles.todoItem}
                  key={todo.id}
                  onPress={() => {
                    handleMarkComplete(todo);
                  }}>
                  <View style={styles.todoCenter}>
                    <Text style={styles.completedTodo} numberOfLines={2}>
                      {todo.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            );
          })}
      </ScrollView>
      <View>
        {showDialog && (
          <DialogComponent
            title={dialogTitle}
            onSubmit={selectedTodo ? handleEditTodo : handleAddTodo}
            onDismiss={handleDismiss}
            selectedTodo={selectedTodo}
          />
        )}
      </View>
    </View>
  );
};

export default TodoList;
