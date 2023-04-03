import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import TodoList from './components/todoList/TodoList';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.headerStyle}>Welcome to ProcrastApp! </Text>
          <TodoList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    padding: 10,
    fontSize: 32,
    flex: 1,
  },
});

export default App;
