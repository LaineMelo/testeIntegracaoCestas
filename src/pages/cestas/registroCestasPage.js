import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput, Text } from 'react-native-paper';

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
      const response = await axios.post('https://localhost:7164/api/RegistroCesta'
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

        <Text 
          style={styles.title}
          variant="displayLarge">
          Cesta
        </Text>

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

        <div style={{ display: "flex", 
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button
          style={styles.button}
          icon="content-save"
          mode="contained"
          onPress={handleRegistro}>
            Registrar
          </Button>
        </div>

        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  input:{
    marginBottom:10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom:20
  },
  button: {
    width: 200,
    backgroundColor:'#787878',
    marginBottom:8
  }
});

export default RegistroCestaPage;