<template>
  <div class="voted-recipes-container">
    <div class="page-header">
      <h1>My Voted Recipes</h1>
      <div class="filters">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="sortBy" class="filter-select">
          <option value="recent">Most Recent</option>
          <option value="votes">Most Votes</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading">
      Loading your voted recipes...
    </div>
    
    <div v-else-if="filteredRecipes.length" class="recipes-grid">
      <div v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-card">
        <router-link :to="'/recipe/' + recipe.id" class="recipe-link">
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.title" />
            <div class="recipe-overlay">
              <span class="votes">{{ recipe.votes }} votes</span>
            </div>
          </div>
          <div class="recipe-info">
            <h3>{{ recipe.title }}</h3>
            <div class="recipe-meta">
              <span class="category">{{ recipe.category }}</span>
              <span class="difficulty">{{ recipe.difficulty }}</span>
            </div>
            <p class="description">{{ recipe.description }}</p>
            <div class="recipe-footer">
              <span class="time">{{ recipe.prepTime }} + {{ recipe.cookTime }}</span>
              <button @click.prevent="handleUnvote(recipe.id)" class="unvote-btn">
                Remove Vote
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else class="empty-state">
      <img :src="emptyIcon" alt="No voted recipes" class="empty-icon" />
      <h2>No Voted Recipes Yet</h2>
      <p>Start exploring recipes and vote for your favorites!</p>
      <router-link to="/categories" class="browse-btn">Browse Categories</router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import userService from '../services/userService'
import emptyIcon from '../assets/images/empty-votes.svg'

export default {
  name: 'VotedRecipesView',
  setup() {
    const votedRecipes = ref([])
    const loading = ref(true)
    const selectedCategory = ref('')
    const sortBy = ref('recent')
    const categories = ref([])

    const loadVotedRecipes = async () => {
      try {
        const recipes = await userService.getVotedRecipes()
        votedRecipes.value = recipes
        // Extract unique categories
        categories.value = [...new Set(recipes.map(recipe => recipe.category))]
      } catch (error) {
        console.error('Error loading voted recipes:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredRecipes = computed(() => {
      let recipes = [...votedRecipes.value]
      
      // Apply category filter
      if (selectedCategory.value) {
        recipes = recipes.filter(recipe => recipe.category === selectedCategory.value)
      }

      // Apply sorting
      switch (sortBy.value) {
        case 'votes':
          recipes.sort((a, b) => b.votes - a.votes)
          break
        case 'name':
          recipes.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'recent':
        default:
          recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }

      return recipes
    })

    const handleUnvote = async (recipeId) => {
      try {
        await userService.unvoteRecipe(recipeId)
        votedRecipes.value = votedRecipes.value.filter(recipe => recipe.id !== recipeId)
      } catch (error) {
        console.error('Error removing vote:', error)
      }
    }

    onMounted(loadVotedRecipes)

    return {
      votedRecipes,
      loading,
      selectedCategory,
      sortBy,
      categories,
      filteredRecipes,
      handleUnvote,
      emptyIcon
    }
  }
}
</script>

<style scoped>
.voted-recipes-container {
  max-width: 1200px;
  margin: 80px auto 2rem;
  padding: 0 1rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  color: #1a202c;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  font-size: 0.95rem;
  cursor: pointer;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: translateY(-4px);
}

.recipe-link {
  text-decoration: none;
  color: inherit;
}

.recipe-image {
  position: relative;
  height: 200px;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
}

.votes {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.recipe-info {
  padding: 1.5rem;
}

.recipe-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  margin: 0.75rem 0;
}

.category, .difficulty {
  font-size: 0.9rem;
  color: #718096;
}

.description {
  color: #4a5568;
  font-size: 0.95rem;
  margin: 0.75rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.time {
  color: #718096;
  font-size: 0.9rem;
}

.unvote-btn {
  background: none;
  border: 1px solid #e53e3e;
  color: #e53e3e;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.unvote-btn:hover {
  background: #fff5f5;
}

.loading, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.empty-state h2 {
  color: #2d3748;
  margin: 0 0 0.5rem;
}

.empty-state p {
  color: #718096;
  margin: 0 0 1.5rem;
}

.browse-btn {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.browse-btn:hover {
  background-color: #3182ce;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filters {
    width: 100%;
  }

  .filter-select {
    flex: 1;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
</style> 