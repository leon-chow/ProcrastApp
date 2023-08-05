import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TodoItem} from '../../../utils/interfaces/TodoItem';
import {styles} from '../todoList.style';

export const Item = ({
  id,
  title,
  details,
  dueDate,
  isComplete,
  priority,
  handleMarkComplete,
  handleDeleteTodo,
}: TodoItem) => (
  <View style={styles.todoItem}>
    <Text style={styles.todoTitle} numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.todoCenter}>
      <Text style={styles.todoText} numberOfLines={2}>
        {details}
      </Text>
    </View>
    <View style={styles.todoCenter}>
      <TouchableOpacity
        style={styles.todoLeft}
        onPress={() =>
          handleMarkComplete({
            id,
            title,
            details,
            dueDate,
            isComplete,
            priority,
          })
        }>
        <Text style={styles.button}> {'\u2713'} </Text>
      </TouchableOpacity>
      <Text
        style={[styles.button, styles.todoRight]}
        onPress={() => {
          handleDeleteTodo(id);
        }}>
        X
      </Text>
    </View>
  </View>
);
