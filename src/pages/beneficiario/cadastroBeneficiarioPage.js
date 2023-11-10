import React , { useState } from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

const CadastroBeneficiarioPage = () => {

  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [foto, setFoto] = useState("");

  const handleCadastro = async () => {
    try {
      
      const response = await fetch('https://localhost:7164/api/Beneficiarios'
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          apelido,
          rg,
          cpf,
          telefone,
          logradouro,
          bairro,
          numero,
          cidade,
          foto,
        }),
      });

      if (response.ok) {
        console.log('Beneficiário registrado com sucesso!');
      } else {
        console.error('Erro ao registrar beneficiário!');
        
        console.log('Status:', response.status);
        console.log('Body:', await response.json());

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return(
      <Container>
        <Header title={'Beneficiario'} />
        <Body>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Apelido"
          value={apelido}
          onChangeText={text => setApelido(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="RG"
          value={rg}
          onChangeText={text => setRg(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="CPF"
          value={cpf}
          onChangeText={text => setCpf(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Telefone"
          value={telefone}
          onChangeText={text => setTelefone(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Logradouro"
          value={logradouro}
          onChangeText={text => setLogradouro(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Bairro"
          value={bairro}
          onChangeText={text => setBairro(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Número"
          value={numero}
          onChangeText={text => setNumero(text)}
        />


        <TextInput
          style={styles.input}
          mode="outlined"
          label="Cidade"
          value={cidade}
          onChangeText={text => setCidade(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Foto"
          value={foto}
          onChangeText={text => setFoto(text)}
        />

        <Button 
        icon="content-save" 
        mode="contained" 
        onPress={handleCadastro}>
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

export default CadastroBeneficiarioPage;