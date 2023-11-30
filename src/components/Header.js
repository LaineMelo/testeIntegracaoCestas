import { Appbar } from 'react-native-paper';


const Header = () => {
    return (
        <Appbar.Header>
          <Appbar.Content
          title='Sistema de Gerenciamento de Cestas'
          titleStyle={{ fontSize: 18, fontWeight:'bold', textAlign:'center', height:25, padding:0 }} />
      
      </Appbar.Header>
      
    );
}

export default Header;