import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

import BackButton from '../../components/BackButton';

const RegistroCestaPage = () => {

  const [idBeneficiario, setIdBeneficiario] = useState("");
  const [idVoluntario, setIdVoluntario] = useState("");
  const [quantidadeCesta, setQuantidadeCesta] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [dataAtual, setDataAtual] = useState('');

  const handleRegistro = async () => {
    try {

      const dataAtual = new Date();
      // Formatar a data e hora no formato ISO 8601
      const dataEntrega = dataAtual.toISOString();

      const data = {
        idBeneficiario,
        idVoluntario: 0,
        quantidadeCesta,
        dataEntrega: dataAtual,
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

  useEffect(() => {
    // Obter a data e hora atuais
    const dataHoraAtual = new Date();
    // Formatar a data e hora no formato desejado
    const formatoDataHora = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    const dataHoraFormatada = dataHoraAtual.toLocaleString(undefined, formatoDataHora);

    // Definir a data formatada no estado
    setDataAtual(dataHoraFormatada);
  }, []);

  return (
    
<Body>
      <Header />
       <BackButton />

        <Text
          style={styles.title}
          variant="displayLarge">
          Registro Cestas
        </Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Beneficiário"
          value={idBeneficiario}
          onChangeText={text => setIdBeneficiario(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Voluntário"
          value={idVoluntario}
          editable={false}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Quantidade"
          value={quantidadeCesta}
          onChangeText={text => setQuantidadeCesta(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label={`Data: ${dataAtual}`}
          value={dataEntrega}
          editable={false}
        />

        <View style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Button
            style={styles.button}
            icon="content-save"
            mode="contained"
            onPress={handleRegistro}>
            Registrar
          </Button>
        </View>

      </Body>
    
  );

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10
  },
  button: {
    width: 200,
    // backgroundColor:'#787878',
    marginBottom: 8
  }
});

export default RegistroCestaPage;