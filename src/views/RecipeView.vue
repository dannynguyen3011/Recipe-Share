<template>
  <div class="recipe-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading recipe...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <h2>Error</h2>
      <p>{{ error }}</p>
      <router-link to="/recipes" class="btn-primary">Back to Recipes</router-link>
    </div>

    <!-- Recipe Content -->
    <div v-else-if="recipe" class="recipe-content">
      <!-- Recipe Header -->
      <div class="recipe-header">
        <img :src="recipe.image" :alt="recipe.title" class="recipe-hero-image">
        <div class="recipe-header-content">
          <h1>{{ recipe.title }}</h1>
          <p class="recipe-description">{{ recipe.description }}</p>
          <div class="recipe-meta">
            <span class="meta-item">
              <i class="fas fa-clock"></i>
              Prep: {{ recipe.prepTime }}
            </span>
            <span class="meta-item">
              <i class="fas fa-fire"></i>
              Cook: {{ recipe.cookTime }}
            </span>
            <span class="meta-item">
              <i class="fas fa-user-friends"></i>
              Serves: {{ recipe.servings }}
            </span>
            <span class="meta-item">
              <i class="fas fa-chart-line"></i>
              Difficulty: {{ recipe.difficulty }}
            </span>
          </div>
          <div class="recipe-actions">
            <button 
              class="btn-vote" 
              :class="{ voted: recipe.hasVoted }"
              @click="handleVote"
              :disabled="loading || voteLoading"
            >
              <i class="fas" :class="recipe.hasVoted ? 'fa-heart' : 'fa-heart-o'"></i>
              <span class="vote-count">{{ recipe.votes }}</span>
              <span class="vote-text">{{ recipe.hasVoted ? 'Voted' : 'Vote' }}</span>
            </button>
            <button 
              class="btn-save" 
              :class="{ saved: recipe.isSaved }"
              @click="handleSave"
              :disabled="loading || saveLoading"
            >
              <i class="fas" :class="recipe.isSaved ? 'fa-bookmark' : 'fa-bookmark-o'"></i>
              <span class="save-text">{{ recipe.isSaved ? 'Saved' : 'Save' }}</span>
            </button>
            <button class="btn-secondary" @click="handlePrint">
              <i class="fas fa-print"></i>
              Print Recipe
            </button>
            <button class="btn-secondary" @click="handleShare">
              <i class="fas fa-share"></i>
              Share
            </button>
          </div>
        </div>
      </div>

      <!-- Recipe Main Content -->
      <div class="recipe-main">
        <!-- Ingredients Section -->
        <section class="recipe-section ingredients-section">
          <h2>Ingredients</h2>
          <ul class="ingredients-list">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.name" class="ingredient-item">
              <span class="ingredient-amount">{{ ingredient.amount }}</span>
              <span class="ingredient-name">{{ ingredient.name }}</span>
            </li>
          </ul>
        </section>

        <!-- Instructions Section -->
        <section class="recipe-section instructions-section">
          <h2>Instructions</h2>
          <ol class="instructions-list">
            <li v-for="(instruction, index) in recipe.instructions" 
                :key="index" 
                class="instruction-item">
              {{ instruction }}
            </li>
          </ol>
        </section>

        <!-- Tips Section -->
        <section class="recipe-section tips-section">
          <h2>Chef's Tips</h2>
          <ul class="tips-list">
            <li v-for="(tip, index) in recipe.tips" 
                :key="index" 
                class="tip-item">
              {{ tip }}
            </li>
          </ul>
        </section>

        <!-- Nutrition Facts -->
        <section class="recipe-section nutrition-section">
          <h2>Nutrition Facts</h2>
          <div class="nutrition-grid">
            <div v-for="(value, key) in recipe.nutritionFacts" 
                 :key="key" 
                 class="nutrition-item">
              <span class="nutrition-label">{{ key }}</span>
              <span class="nutrition-value">{{ value }}</span>
            </div>
          </div>
        </section>

        <!-- New Recipe Calculator Component -->
        <RecipeCalculator 
          :recipe-ingredients="recipe.ingredients"
          :default-servings="recipe.servings"
          class="recipe-calculator-section"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import userService from '../services/userService'
import RecipeCalculator from '../components/RecipeCalculator.vue'

export default {
  name: 'RecipeView',
  components: {
    RecipeCalculator
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const recipe = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const voteLoading = ref(false)
    const saveLoading = ref(false)

    const loadRecipe = async () => {
      try {
        const recipeData = await userService.getRecipe(route.params.id)
        // Check if recipe is saved
        const savedRecipes = await userService.getSavedRecipes()
        recipeData.isSaved = savedRecipes.some(r => r.id === recipeData.id)
        recipe.value = recipeData
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const handleVote = async () => {
      try {
        voteLoading.value = true
        
        if (!userService.isAuthenticated()) {
          // Save current path for redirect after login
          localStorage.setItem('redirectAfterLogin', route.fullPath)
          router.push('/login')
          return
        }

        if (recipe.value.hasVoted) {
          await userService.unvoteRecipe(recipe.value.id)
          recipe.value.votes--
        } else {
          await userService.voteRecipe(recipe.value.id)
          recipe.value.votes++
        }
        
        recipe.value.hasVoted = !recipe.value.hasVoted
      } catch (err) {
        alert(err.message)
      } finally {
        voteLoading.value = false
      }
    }

    const handleSave = async () => {
      if (!userService.isAuthenticated()) {
        localStorage.setItem('redirectAfterLogin', route.fullPath)
        router.push('/login')
        return
      }

      try {
        saveLoading.value = true
        
        if (recipe.value.isSaved) {
          await userService.unsaveRecipe(recipe.value.id)
          recipe.value.isSaved = false
          // Dispatch unsave event
          window.dispatchEvent(new CustomEvent('recipe-saved', {
            detail: {
              recipeId: recipe.value.id,
              isSaved: false,
              recipe: null
            }
          }))
        } else {
          await userService.saveRecipe(recipe.value.id)
          recipe.value.isSaved = true
          // Dispatch save event with recipe data
          window.dispatchEvent(new CustomEvent('recipe-saved', {
            detail: {
              recipeId: recipe.value.id,
              isSaved: true,
              recipe: recipe.value
            }
          }))
        }
      } catch (err) {
        alert(err.message)
      } finally {
        saveLoading.value = false
      }
    }

    // Listen for recipe-saved events
    const handleRecipeSaved = (event) => {
      const { recipeId, isSaved } = event.detail
      if (recipe.value && recipe.value.id === recipeId) {
        recipe.value.isSaved = isSaved
      }
    }

    const handlePrint = () => {
      window.print()
    }

    const handleShare = async () => {
      try {
        await navigator.share({
          title: recipe.value.title,
          text: recipe.value.description,
          url: window.location.href
        })
      } catch (err) {
        // Fallback for browsers that don't support sharing
        alert('Share this recipe: ' + window.location.href)
      }
    }

    onMounted(() => {
      loadRecipe()
      window.addEventListener('recipe-saved', handleRecipeSaved)
    })

    onUnmounted(() => {
      window.removeEventListener('recipe-saved', handleRecipeSaved)
    })

    return {
      recipe,
      loading,
      error,
      voteLoading,
      saveLoading,
      handleVote,
      handleSave,
      handlePrint,
      handleShare
    }
  }
}
</script>

<style scoped>
.recipe-container {
  max-width: 1200px;
  margin: 80px auto 2rem;
  padding: 0 1rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.recipe-header {
  margin-bottom: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recipe-hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.recipe-header-content {
  padding: 2rem;
}

.recipe-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.recipe-description {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.recipe-actions {
  display: flex;
  gap: 1rem;
}

.btn-vote,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-vote {
  background-color: #fff;
  color: #f44336;
  border: 2px solid #f44336;
}

.btn-vote:hover:not(:disabled) {
  background-color: #f44336;
  color: white;
}

.btn-vote.voted {
  background-color: #f44336;
  color: white;
}

.btn-vote:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.vote-count {
  font-weight: bold;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #4299e1;
  background: white;
  color: #4299e1;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save:hover {
  background: #ebf8ff;
}

.btn-save.saved {
  background: #4299e1;
  color: white;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.recipe-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.recipe-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recipe-section h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.ingredients-list {
  list-style: none;
  padding: 0;
}

.ingredient-item {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.ingredient-amount {
  min-width: 100px;
  font-weight: 500;
}

.instructions-list {
  padding-left: 1.5rem;
}

.instruction-item {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tip-item {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.tip-item::before {
  content: "💡";
  position: absolute;
  left: 0;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.nutrition-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

.nutrition-label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  text-transform: capitalize;
}

.nutrition-value {
  font-weight: 500;
  color: #333;
}

@media print {
  .recipe-actions,
  .btn-vote,
  .btn-secondary {
    display: none;
  }

  .recipe-container {
    margin: 0;
    padding: 0;
  }

  .recipe-section {
    box-shadow: none;
    padding: 1rem 0;
  }
}

@media (max-width: 768px) {
  .recipe-hero-image {
    height: 250px;
  }

  .recipe-header-content {
    padding: 1.5rem;
  }

  .recipe-header h1 {
    font-size: 2rem;
  }

  .recipe-meta {
    gap: 1rem;
  }

  .recipe-actions {
    flex-direction: column;
  }

  .recipe-main {
    grid-template-columns: 1fr;
  }
}

.recipe-calculator-section {
  margin: 32px 0;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
}
</style> 