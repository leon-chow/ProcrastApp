import React, {useState} from 'react';
import {Modal, Text, Button, View, TextInput, StyleSheet} from 'react-native';
import {Todo} from '../../utils/interfaces/Todo';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

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
  const today = new Date();
  const tomorrow = new Date();
  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 1);
  tomorrow.setTime(today.getTime() + 24 * 60 * 60 * 1000); // hours * minutes * seconds * ms

  const [todo, setTodo] = useState<string>(selectedTodo?.title || '');
  const [dueDate, setDueDate] = useState<Date>(
    selectedTodo ? new Date(selectedTodo.dueDate) : tomorrow,
  );
  const [priority, setPriority] = useState<String>(
    selectedTodo ? selectedTodo.priority : 'low',
  );
  const [details, setDetails] = useState<String>('');
  const [dateDialog, setDateDialog] = useState<boolean>(false);

  const handleOnSubmit = () => {
    const newTodo = [todo, details, dueDate, priority, false];
    onSubmit(newTodo);
  };

  const handleOnDismiss = () => {
    onDismiss();
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
          onChangeText={setTodo}
          underlineColorAndroid="black"
          placeholderTextColor={'gray'}
          defaultValue={selectedTodo ? selectedTodo.title : ''}
        />
        <TextInput
          style={styles.textHeader}
          placeholder="Please enter the details..."
          onChangeText={setDetails}
          underlineColorAndroid="black"
          placeholderTextColor={'gray'}
          defaultValue={selectedTodo ? selectedTodo.details : ''}
        />
        <Text
          style={dueDate ? styles.datePickerPrompt : styles.placeholder}
          onPress={() => setDateDialog(true)}>
          Due Date:{' '}
          {dueDate
            ? `${dueDate.toDateString()} ${dueDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : 'Please enter a due date...'}
        </Text>
        <DatePicker
          modal
          open={dateDialog}
          date={dueDate}
          minimumDate={minDate}
          onConfirm={date => {
            setDateDialog(false);
            setDueDate(date);
            console.log(`new start date: ${dueDate}`);
          }}
          onCancel={() => {
            setDateDialog(false);
          }}
        />
        <View>
          <Text style={styles.label}> Priority </Text>
          <Picker
            selectedValue={priority}
            onValueChange={itemValue => setPriority(itemValue)}>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="med" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
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
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 32,
    textAlign: 'center',
  },
  datePickerPrompt: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  placeholder: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'gray',
    textDecorationLine: 'underline',
  },
  label: {
    paddingLeft: 12.5,
    color: 'black',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});

export default DialogComponent;
