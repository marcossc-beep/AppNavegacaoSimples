
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Receitas from './screens/Receitas';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Categorias from './screens/Categorias';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [usuario, setUsuario] = useState(null);

  const onLoginSuccess = (user) => {
    setUsuario(user);
    setCurrentScreen('Home');
  };

  const onLogout = () => {
    setUsuario(null);
    setCurrentScreen('login');
  };

  const onNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    if (!usuario) {
      if (currentScreen === 'cadastro') {
        return <Cadastro onNavigateToLogin={() => setCurrentScreen('login')} />;
      }
      return <Login onLoginSuccess={onLoginSuccess} onNavigateToRegister={() => setCurrentScreen('cadastro')} />;
    }
    switch (currentScreen) {
      case 'Home':
        return <Home onNavigate={onNavigate} onLogout={onLogout} usuario={usuario} />;
      case 'receitas':
        return <Receitas onNavigate={onNavigate} usuario={usuario} />;
      case 'categorias':
        return <Categorias onNavigate={onNavigate} usuario={usuario} />;
      default:
        return <Text>404 Not Found</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
