import React from 'react';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';
import styles from './recipes.module.css';

const RecipesPage = () => {
  if (!recipesData || !recipesData.recipes) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>No recipes found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Recipes</h1>
        <div className={styles.grid}>
          {recipesData.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecipesPage; 