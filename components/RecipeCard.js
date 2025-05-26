import React from 'react';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={recipe.imageUrl} alt={recipe.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <div className={styles.details}>
          <span className={styles.badge}>{recipe.category}</span>
          <span className={styles.info}>
            <i className={styles.icon}>⏱</i> {recipe.prepTime} + {recipe.cookTime}
          </span>
          <span className={styles.info}>
            <i className={styles.icon}>👥</i> Serves {recipe.servings}
          </span>
          <span className={styles.difficulty}>{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 