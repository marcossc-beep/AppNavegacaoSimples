import { StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import Home from './screens/Home';
import Receitas from './screens/Receitas';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const onNavigate = (screen) => {
    setCurrentScreen(screen);
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <Home onNavigate={onNavigate} />;
      case 'receitas':
        return <Receitas onNavigate={onNavigate} />;
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
