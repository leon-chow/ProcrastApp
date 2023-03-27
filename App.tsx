import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import TodoList from './components/todoList/TodoList';

const headerStyle = {
  padding: 10,
  fontSize: 32,
  flex: 1,
};

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={headerStyle}>Welcome to ProcrastApp! </Text>
          <TodoList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
