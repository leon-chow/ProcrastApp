import React, {useState} from 'react';
import {Modal, Text, Button, View, TextInput, StyleSheet} from 'react-native';
import {Todo} from '../../utils/interfaces/Todo';

interface IProps {
  title: string;
  onSubmit: Function;
  onDismiss: Function;
  selectedTodo?: Todo;
}
const DialogComponent = ({
  title,
  onSubmit,
  onDismiss,
  selectedTodo,
}: IProps): JSX.Element => {
  const [todo, setTodo] = useState<string>(selectedTodo?.value || '');
  const handleOnSubmit = () => {
    onSubmit(todo);
  };

  const handleOnDismiss = () => {
    onDismiss();
  };

  const handleInputChange = (text: string) => {
    setTodo(text);
  };

  return (
    <Modal animationType="slide">
      <View>
        <Text style={styles.header}>{title}</Text>
      </View>
      <View>
        <TextInput
          style={styles.textHeader}
          placeholder="Please enter your todo item"
          onChangeText={handleInputChange}
          underlineColorAndroid="black"
          placeholderTextColor={'gray'}
          defaultValue={selectedTodo ? selectedTodo.value : ''}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleOnDismiss} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleOnSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textHeader: {
    color: 'black',
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
  },
});

export default DialogComponent;
