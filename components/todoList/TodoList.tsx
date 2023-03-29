import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {Button} from '@react-native-material/core';
import {Todo} from '../../utils/interfaces/Todo';
import DialogComponent from '../dialog/dialogComponent';
const TodoList = (): JSX.Element => {
  const handleDismiss = () => {
    setShowDialog(false);
  };
  const handleTodo = (text: string) => {
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
    console.log(todos);
  };

  const [todos] = useState<Todo[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.header}>Todo: </Text>
          <View style={styles.todoList}>
            {todos &&
              todos.map(todo => {
                return (
                  <View key={todo.id}>
                    <Text style={styles.todoText}>
                      {'\u2022'} {todo.value}
                    </Text>
                  </View>
                );
              })}
          </View>
          <View style={styles.buttonContainer}>
            <Button title={'Add Todo'} onPress={() => setShowDialog(true)} />
          </View>
        </View>
        {showDialog && (
          <DialogComponent
            title={'Add Todo'}
            onSubmit={handleTodo}
            onDismiss={handleDismiss}
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
    color: 'red',
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
});

export default TodoList;
