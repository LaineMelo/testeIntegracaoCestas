import React from 'react';
import { Button } from 'react-native-paper';

const SearchButton = ({ onPress }) => (
  <Button icon="card-search-outline" mode="contained" onPress={onPress}>
    Pesquisar
  </Button>
);

export default SearchButton;
