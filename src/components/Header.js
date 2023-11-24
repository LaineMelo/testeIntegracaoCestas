import { Appbar } from 'react-native-paper';


const Header = () => {
    return (
        <Appbar.Header>
          <Appbar.Content
          title='Sistema de Gerenciamento de Cestas'
          titleStyle={{ fontSize: 16, fontWeight:'bold', textAlign:'center' }} />
      
      </Appbar.Header>
      
    );
}

export default Header;