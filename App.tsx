import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import TodoList from './components/todoList/TodoList';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text style={styles.headerStyle}>ProcrastApp </Text>
      <TodoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default App;
