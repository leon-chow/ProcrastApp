import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
    maxWidth: '95%',
  },
  todoRight: {
    flexDirection: 'row',
    minWidth: 30,
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
  todoPrompt: {
    fontStyle: 'italic',
    color: 'gray',
  },
  deleteButton: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 24,
  },
});
