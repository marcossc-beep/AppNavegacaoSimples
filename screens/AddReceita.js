import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddReceita({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const saveRecipe = () => {
    const newErrors = {};
    if (!title.trim()) {
        newErrors.title = 'Título obrigatório'; 
    }
    if (!ingredients.trim()) {
        newErrors.ingredients = 'Ingredientes obrigatórios'; 
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      ingredients: ingredients.trim(),
      imageUrl: imageUrl.trim(),
    });
    setTitle('');
    setIngredients('');
    setImageUrl('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Adicionar Receita</Text>
          <TextInput
            style={styles.input}
            placeholder="Título da Receita"
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && (
            <Text style={{ color: 'red', marginBottom: 8 }}>{errors.title}</Text>
          )}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ingredientes"
            value={ingredients}
            onChangeText={setIngredients}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="URL da imagem (opcional)"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          {errors.ingredients && (
            <Text style={{ color: 'red', marginBottom: 8 }}>{errors.ingredients}</Text>
          )}
          <View style={styles.formActions}>
            <TouchableOpacity style={[styles.formButton, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formButton, styles.saveButton]} onPress={saveRecipe}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
