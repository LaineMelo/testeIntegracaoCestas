import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

const RegistroCestaPage = () => {

  const [beneficiario, setBeneficiario] = React.useState("");
  const [voluntario, setVoluntario] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [observacao, setObservacao] = React.useState("");

  const handleRegistro = async () => {
    try {
      // Configurar os dados que você deseja enviar para a API
      const data = {
        beneficiario,
        voluntario,
        quantidade,
        observacao,
      };

      // Fazer uma solicitação POST para a API com os dados do formulário
      const response = await axios.post('https://10.0.2.2:7164/swagger/index.html/api/RegistroCesta'
      , data);

      // Aqui, você pode lidar com a resposta da API conforme necessário
      console.log('Resposta da API:', response.data);
    } catch (error) {
      // Lidar com erros, como falha na conexão ou resposta inválida
      console.error('Erro ao fazer a solicitação para a API:', error);
    }
  };

    return(
      <Container>
        <Header title={'Entrega de Cesta'} />
        <Body>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Beneficiário"
          value={beneficiario}
          onChangeText={text => setBeneficiario(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Voluntário"
          value={voluntario}
          onChangeText={text => setVoluntario(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Quantidade"
          value={quantidade}
          onChangeText={text => setQuantidade(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Observação"
          value={observacao}
          onChangeText={text => setObservacao(text)}
        />

        <Button 
        icon="content-save" 
        mode="contained" 
        onPress={handleRegistro}>
          Registrar
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

export default RegistroCestaPage;