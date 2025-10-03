


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Modal, TextInput, Alert, SafeAreaView, ScrollView, Image } from 'react-native';

export default function Receitas({ onNavigate, usuario }) {
  const [receitas, setReceitas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ nome: '', modo_preparo: '', ingredientes: '', categoria_id: '' });
  const [loading, setLoading] = useState(false);

  const fetchReceitas = async () => {
    try {
      const res = await fetch('http://10.23.16.58:3000/receitas');
      const data = await res.json();
      setReceitas(data);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas');
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await fetch('http://10.23.16.58:3000/categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar as categorias');
    }
  };

  useEffect(() => {
    fetchReceitas();
    fetchCategorias();
  }, []);

  const handleAddReceita = async () => {
    if (!form.nome || !form.modo_preparo || !form.ingredientes || !form.categoria_id) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://10.23.16.58:3000/receitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          usuario_id: usuario.id,
          categoria_id: parseInt(form.categoria_id)
        })
      });
      if (res.ok) {
        setModalVisible(false);
        setForm({ nome: '', modo_preparo: '', ingredientes: '', categoria_id: '' });
        fetchReceitas();
      } else {
        const data = await res.json();
        Alert.alert('Erro', data.error || 'Erro ao adicionar receita');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
            <Image source={require('../assets/arrow-bg.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <Text style={styles.header}>Receitas</Text>
        </View>
        <FlatList
          data={receitas}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.receitaItem}>
              <Text style={styles.receitaNome}>{item.nome}</Text>
              <Text style={styles.receitaCategoria}>
                Categoria: {categorias.find(c => c.id === item.categoria_id)?.nome || 'N/A'}
              </Text>
              <Text>Ingredientes: {item.ingredientes}</Text>
              <Text>Modo de preparo: {item.modo_preparo}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhuma receita cadastrada.</Text>}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Adicionar Receita</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.header}>Nova Receita</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={form.nome}
              onChangeText={v => setForm(f => ({ ...f, nome: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Modo de preparo"
              value={form.modo_preparo}
              onChangeText={v => setForm(f => ({ ...f, modo_preparo: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingredientes"
              value={form.ingredientes}
              onChangeText={v => setForm(f => ({ ...f, ingredientes: v }))}
            />
            <Text style={{ marginTop: 8 }}>Categoria:</Text>
            <View style={styles.pickerContainer}>
              <FlatList
                data={categorias}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={form.categoria_id == item.id ? styles.pickerItemSelected : styles.pickerItem}
                    onPress={() => setForm(f => ({ ...f, categoria_id: item.id.toString() }))}
                  >
                    <Text>{item.nome}</Text>
                  </TouchableOpacity>
                )}
                horizontal
              />
            </View>
            <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleAddReceita} disabled={loading} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#d9534f" />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 28,
    gap: 12,
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e67e22',
  },
  receitaItem: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 12 },
  receitaNome: { fontSize: 18, fontWeight: 'bold' },
  receitaCategoria: { fontStyle: 'italic', color: '#888' },
  addButton: { backgroundColor: '#e67e22', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  input: { width: 250, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { flexDirection: 'row', marginVertical: 8 },
  pickerItem: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 4 },
  pickerItemSelected: { padding: 8, borderWidth: 2, borderColor: '#e67e22', borderRadius: 8, marginHorizontal: 4, backgroundColor: '#ffe5b4' },
});