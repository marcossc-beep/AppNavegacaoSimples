import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Login = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.23.16.58:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.usuario);
      } else {
        alert('Erro', data.error || 'Falha no login');
      }
    } catch (err) {
      alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
      <TouchableOpacity onPress={onNavigateToRegister} style={styles.link}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: { width: 250, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 },
  link: { marginTop: 16 },
  linkText: { color: '#007bff' }
});

export default Login;
