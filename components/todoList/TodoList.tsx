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
  const [todos] = useState<Todo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Todo');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const handleDismiss = () => {
    setShowDialog(false);
  };
  const handleAddTodo = (text: string) => {
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
  const handleEditTodo = (newText: string) => {
    console.log('editing...');
    const todoIndex = todos.findIndex(todo => todo.id === selectedTodo!.id);
    todos[todoIndex].value = newText;
    setShowDialog(false);
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
                  <TouchableOpacity
                    key={todo.id}
                    onPress={() => {
                      setDialogTitle(`Edit Todo #${todo.id}`);
                      setShowDialog(true);
                      setSelectedTodo(todo);
                    }}
                    style={styles.todoItem}>
                    <Text style={styles.todoText} numberOfLines={2}>
                      {'\u2022'} {todo.value}
                    </Text>
                  </TouchableOpacity>
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
  todoText: {
    fontSize: 24,
  },
  todoItem: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default TodoList;
