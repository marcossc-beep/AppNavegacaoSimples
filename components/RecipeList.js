

// Componente que exibe uma lista de receitas
// Recebe:
// - recipes: array de objetos de receita
// - onDelete: função para deletar uma receita
import React from 'react';
import { View, Text } from 'react-native';
import RecipeItem from './RecipeItem';

export default function RecipeList({ recipes, onDelete }) {
  return (
    <View>
      {/* Se não houver receitas, mostra uma mensagem amigável */}
      {recipes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18, color: '#95a5a6' }}>
          Nenhuma receita cadastrada.
        </Text>
      ) : (
        // Para cada receita, renderiza um RecipeItem, passando os dados e a função de deletar
        recipes.map(item => (
          <RecipeItem key={item.id} item={item} onDelete={onDelete} />
        ))
      )}
    </View>
  );
}
