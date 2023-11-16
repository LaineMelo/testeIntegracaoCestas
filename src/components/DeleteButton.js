import React from 'react';
import { Button } from 'react-native-paper';

const DeleteButton = ({ onPress }) => (
  <Button 
  mode='outlined'
  onPress={onPress}>Excluir</Button>
);

export default DeleteButton;
