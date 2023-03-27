import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {Button} from '@react-native-material/core';
import {Todo} from '../../utils/interfaces/Todo';
import DialogComponent from '../dialog/dialogComponent';
const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      name: 'todo',
      id: 1,
      value: 'string',
    },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.header}>Todo: </Text>
          <Button title={'Add Todo'} onPress={() => setShowDialog(true)} />
          {todos &&
            todos.map(todo => {
              return <Text key={todo.id}> {todo.value} </Text>;
            })}
        </View>
        {showDialog && (
          <DialogComponent
            visible={showDialog}
            title={'Add Todo'}
            onSubmit={setTodos(todos)}
            onDismiss={setShowDialog(false)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    color: 'red',
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
    flex: 1,
  },
});

export default TodoList;
