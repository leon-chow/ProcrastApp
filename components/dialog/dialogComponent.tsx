import React, {useState} from 'react';
import {Modal, Text, Button, View, TextInput, StyleSheet} from 'react-native';
import {Todo} from '../../utils/interfaces/Todo';
import DatePicker from 'react-native-date-picker';

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
  const oneWeekLater = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 7,
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds(),
  );
  const [todo, setTodo] = useState<string>(selectedTodo?.value || '');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(oneWeekLater));
  const [startDateDialog, setStartDateDialog] = useState<boolean>(false);
  const [endDateDialog, setEndDateDialog] = useState<boolean>(false);
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
        <Text
          style={startDate ? styles.datePickerPrompt : styles.placeholder}
          onPress={() => setStartDateDialog(true)}>
          Start Date & Time:{' '}
          {startDate
            ? `${startDate.toDateString()} ${startDate.toLocaleTimeString()}`
            : 'Please enter a start date...'}
        </Text>
        <Text
          style={endDate ? styles.datePickerPrompt : styles.placeholder}
          onPress={() => setEndDateDialog(true)}>
          End Date & Time:{' '}
          {endDate
            ? `${endDate.toDateString()} ${endDate.toLocaleTimeString()}`
            : 'Please enter an end date...'}
        </Text>
        <DatePicker
          modal
          open={startDateDialog}
          date={startDate}
          onConfirm={date => {
            setStartDateDialog(false);
            console.log(`setting new date: ${date}`);
            setStartDate(date);
          }}
          onCancel={() => {
            setStartDateDialog(false);
          }}
        />
        <DatePicker
          modal
          open={endDateDialog}
          date={endDate}
          onConfirm={date => {
            setEndDateDialog(false);
            console.log(`setting new date: ${date}`);
            setEndDate(date);
          }}
          onCancel={() => {
            setEndDateDialog(false);
          }}
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
  },
  placeholder: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'gray',
  },
});

export default DialogComponent;
