import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

const CadastroNecessidadesBeneficiarioPage = () => {

  const [descricao, setDescricao] = React.useState("");

    return(
      <Container>
        <Header title={'Necessidades'} />
        <Body>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Descrição"
          value={descricao}
          onChangeText={text => setDescricao(text)}
        />

        <Button 
        icon="content-save" 
        mode="contained" 
        onPress={() => console.log     ('Pressed')}>
          Cadastrar
        </Button>

        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  input:{
    marginBottom:10,
  }
});

export default CadastroNecessidadesBeneficiarioPage;