import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Modal, TextInput, Image } from 'react-native';

const Categorias = ({ onNavigate }) => {
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategorias = async () => {
    try {
      const res = await fetch('http://10.23.16.58:3000/categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      alert('Erro', 'Não foi possível carregar as categorias');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleAddCategoria = async () => {
    if (!nome) {
      alert('Preencha o nome da categoria!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://10.23.16.58:3000/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
      });
      if (res.ok) {
        setModalVisible(false);
        setNome('');
        fetchCategorias();
      } else {
        const data = await res.json();
        alert('Erro', data.error || 'Erro ao adicionar categoria');
      }
    } catch (err) {
      alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Image source={require('../assets/arrow-bg.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <Text style={styles.header}>Categorias</Text>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoriaItem}>
            <Text style={styles.categoriaNome}>{item.nome}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhuma categoria cadastrada.</Text>}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Categoria</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Nova Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da categoria"
            value={nome}
            onChangeText={setNome}
          />
          <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleAddCategoria} disabled={loading} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#d9534f" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
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
  categoriaItem: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 12 },
  categoriaNome: { fontSize: 18, fontWeight: 'bold' },
  addButton: { 
    backgroundColor: '#e67e22', padding: 14,
    borderRadius: 8, alignItems: 'center', marginTop: 12 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  input: { width: 250, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
});

export default Categorias;
