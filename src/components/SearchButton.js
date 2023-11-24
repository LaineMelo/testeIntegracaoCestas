import React from 'react';
import { Button } from 'react-native-paper';

const SearchButton = ({ onPress }) => (
  <Button
  style={{
    marginRight:20,
    marginLeft:20,
    marginBottom:10,
  }}
  icon="card-search-outline" mode="contained" onPress={onPress}>
    Pesquisar
  </Button>
);

export default SearchButton;
