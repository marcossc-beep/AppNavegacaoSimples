import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ onNavigate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App de Receitas!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onNavigate('receitas')}>
        <Text style={styles.buttonText}>Ver Receitas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,   
    color: '#e67e22',
    textAlign: 'center',
  },
    button: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
  },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});