import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
  },
  header: {
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
  },
  todoList: {
    padding: 10,
    margin: 10,
    marginBottom: 100,
  },
  todoLeft: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'left',
  },
  todoCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  todoRight: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: 16,
  },
  todoItem: {
    flexDirection: 'column',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  todoPrompt: {
    fontStyle: 'italic',
    color: 'gray',
  },
  button: {
    fontSize: 24,
  },
  completedTodo: {
    fontSize: 24,
    textDecorationLine: 'line-through',
  },
});
