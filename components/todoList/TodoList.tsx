import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from '@react-native-material/core';
import {Todo} from '../../utils/interfaces/Todo';
import DialogComponent from '../dialog/dialogComponent';
const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Todo');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const handleDismiss = () => {
    setShowDialog(false);
  };

  const handleAddTodo = (text: string): void => {
    console.log('adding...');
    if (!text) {
      handleDismiss();
      return;
    }
    setShowDialog(false);
    const newTodo: Todo = {
      id: todos.length + 1,
      value: text,
    };
    todos.push(newTodo);
  };

  const handleEditTodo = (newText: string): void => {
    console.log('editing...');
    const todoIndex = todos.findIndex(todo => todo.id === selectedTodo!.id);
    todos[todoIndex].value = newText;
    setShowDialog(false);
  };

  const handleDeleteTodo = (todoID: number): void => {
    console.log('deleting...');
    const newTodos = todos.filter(todo => todo.id !== todoID);
    setTodos(newTodos);
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.header}>Todo: </Text>
          <View style={styles.todoList}>
            {todos &&
              todos.map(todo => {
                return (
                  <View style={styles.todoItem} key={todo.id}>
                    <TouchableOpacity
                      onPress={() => {
                        setDialogTitle(`Edit Todo #${todo.id}`);
                        setShowDialog(true);
                        setSelectedTodo(todo);
                      }}
                      style={styles.todoLeft}>
                      <Text style={styles.todoText} numberOfLines={2}>
                        {'\u2022'} {todo.value}
                      </Text>
                      <TouchableOpacity
                        style={styles.todoRight}
                        onPress={() => {
                          handleDeleteTodo(todo.id);
                        }}>
                        <Text style={styles.deleteButton}> X </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
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

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  header: {
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    margin: 10,
  },
  todoList: {
    padding: 10,
    margin: 10,
  },
  todoLeft: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  todoRight: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 24,
  },
  todoItem: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 24,
  },
});

export default TodoList;
