

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import RecipeList from '../components/RecipeList';
import AddReceita from './AddReceita';

// Tela principal de receitas
// Controla a navegação, lista de receitas e a tela de adicionar
export default function Receitas({ onNavigate }) {
  // Estado para alternar entre lista e tela de adicionar
  const [view, setView] = useState('lista');
  // Lista de receitas
  const [recipes, setRecipes] = useState([]);

  // Adiciona uma nova receita à lista
  const handleAddRecipe = (newRecipe) => {
    setRecipes(currentRecipes => [...currentRecipes, newRecipe]);
    setView('lista');
  };

  // Remove uma receita da lista
  const handleDeleteRecipe = (id) => {
    setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Button
          title="Voltar"
          onPress={() => onNavigate('Home')}
        />
        <Text style={styles.header}>Meu Livro de Receitas </Text>

        {/* Renderiza a lista de receitas ou a tela de adicionar, dependendo do estado */}
        {view === 'lista' ? (
          <View>
            {/* Botão para abrir a tela de adicionar */}
            <TouchableOpacity style={styles.addButton} onPress={() => setView('adicionar')}>
              <Text style={styles.buttonText}>Adicionar Nova Receita</Text>
            </TouchableOpacity>
            {/* Lista de receitas */}
            <RecipeList recipes={recipes} onDelete={handleDeleteRecipe} />
          </View>
        ) : (
          <AddReceita
            onSave={handleAddRecipe}
            onCancel={() => setView('lista')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#e67e22',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});