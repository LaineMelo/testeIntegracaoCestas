import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

const LoginPage = () => {
  const [login, setLogin] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigation = useNavigation();

  const efetuarLogin = () => {
    if(!login || !senha){
      Alert.alert('Atenção','Informe o login e a senha.');
    } else {
      navigation.navigate('home');
    }
  }
  
  return(
   <Container>
    <Header title={'Cestas Aracaju'} />
      <Body>

        <TextInput
          style={styles.input}
          label="Login"
          value={login}
          onChangeText={text => setLogin(text)}
        />

        <TextInput
          style={styles.input}
          label="Senha"
          secureTextEntry
          value={senha}
          onChangeText={text => setSenha(text)}
          right={<TextInput.Icon icon="eye" />}
        />

        <Button 
        icon="login" 
        mode="contained" 
        onPress={(efetuarLogin)}>
          Entrar 
        </Button>

      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  input:{
    backgroundColor:'#FFF',
    marginBottom:20,
  }
});

export default LoginPage;