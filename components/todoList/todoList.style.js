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
    flexGrow: 1,
    marginBottom: 100,
  },
  todoLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  todoCenter: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  todoRight: {
    flexDirection: 'row',
    minWidth: 30,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
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
    justifyContent: 'center',
  },
  todoPrompt: {
    fontStyle: 'italic',
    color: 'gray',
  },
  button: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 24,
  },
  completedTodo: {
    fontSize: 24,
    textDecorationLine: 'line-through',
  },
});
