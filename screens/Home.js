
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ onNavigate, onLogout, usuario }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {usuario?.nome || 'Usuário'}!</Text>
      <TouchableOpacity style={styles.button} onPress={() => onNavigate('receitas')}>
        <Text style={styles.buttonText}>Receitas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onNavigate('categorias')}>
        <Text style={styles.buttonText}>Categorias</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
        <Text style={styles.buttonText}>Sair</Text>
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
    marginBottom: 32,
    color: '#e67e22',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
    marginTop: 16,
    width: 200,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});