import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import TodoList from './components/todoList/TodoList';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text style={styles.headerStyle}>ProcrastApp </Text>
      <ScrollView>
        <TodoList />
      </ScrollView>
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
