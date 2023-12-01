import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Text, ActivityIndicator } from 'react-native-paper';

import Header from '../../components/Header';
import Body from '../../components/Body';

import BackButton from '../../components/BackButton';

import { useNavigation } from '@react-navigation/native';

const RegistroCestaPage = () => {

  const navigation = useNavigation();

  const [idBeneficiario, setIdBeneficiario] = useState('');
  const [idVoluntario, setIdVoluntario] = useState('');
  const [quantidadeCesta, setQuantidadeCesta] = useState('');
  
  const [dataEntrega, setDataEntrega] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    try {
      setLoading(true);

      const dataAtual = new Date();
      const dataEntrega = dataAtual.toISOString();

      const data = {
        idBeneficiario,
        idVoluntario: 0,
        quantidadeCesta,
        dataEntrega: "2023-11-30T14:30:00.000Z",
      };

      const response = await fetch('https://cestasgestor.azurewebsites.net/api/RegistroCesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIdBeneficiario('');
        setQuantidadeCesta('');

        Alert.alert('Cesta registrada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro ao fazer a solicitação para a API:', response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };



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
          label='Data'
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
            onPress={handleRegistro}
            disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : 'Cadastrar'}
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