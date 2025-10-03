import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Cadastro = ({ onNavigateToLogin }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.23.16.58:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, telefone })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado!');
        onNavigateToLogin();
      } else {
        Alert.alert('Erro', data.error || 'Falha no cadastro');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title={loading ? 'Cadastrando...' : 'Cadastrar'} onPress={handleCadastro} disabled={loading} />
      <TouchableOpacity onPress={onNavigateToLogin} style={styles.link}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
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

export default Cadastro;
