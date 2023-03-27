import React from 'react';
import {Modal, Text, Button, View} from 'react-native';

interface IProps {
  visible: boolean;
  title: string;
  onSubmit: void;
  onDismiss: void;
}
const DialogComponent = ({
  visible,
  title,
  onSubmit,
  onDismiss,
}: IProps): JSX.Element => {
  console.log(title, visible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onDismiss={() => onDismiss}>
      <View> {title} </View>
      <View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
          eligendi inventore, laboriosam laudantium minima minus nesciunt
          pariatur sequi.
        </Text>
      </View>
      <Button title="Cancel" onPress={() => onDismiss} />
      <Button title="Ok" onPress={() => onSubmit} />
    </Modal>
  );
};

export default DialogComponent;
