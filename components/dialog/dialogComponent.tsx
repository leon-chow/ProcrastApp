import React, {useState} from 'react';
import {Modal, Text, Button, View, TextInput, StyleSheet} from 'react-native';

interface IProps {
  title: string;
  onSubmit: Function;
  onDismiss: Function;
}
const DialogComponent = ({title, onSubmit, onDismiss}: IProps): JSX.Element => {
  const [todo, setTodo] = useState<string>('');
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
        />
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleOnDismiss} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add Todo" onPress={handleOnSubmit} />
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
