<template>
  <div class="category-container">
    <div v-if="category" class="category-header">
      <div class="category-banner">
        <img :src="category.image" :alt="category.name">
        <div class="category-info">
          <h1>{{ category.name }}</h1>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>

    <div class="recipes-section">
      <div class="recipes-header">
        <h2>{{ category?.name }} Recipes</h2>
        <div class="recipes-filters">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search recipes..."
              @input="filterRecipes"
            >
          </div>
          <div class="sort-box">
            <select v-model="sortBy" @change="filterRecipes">
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading recipes...</p>
      </div>

      <div v-else-if="filteredRecipes.length === 0" class="no-results">
        <p>No recipes found in this category.</p>
      </div>

      <div v-else class="recipes-grid">
        <router-link
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :to="'/recipe/' + recipe.id"
          class="recipe-card"
        >
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.title">
            <div class="recipe-difficulty" :class="recipe.difficulty.toLowerCase()">
              {{ recipe.difficulty }}
            </div>
          </div>
          <div class="recipe-content">
            <h3>{{ recipe.title }}</h3>
            <p class="recipe-description">{{ recipe.description }}</p>
            <div class="recipe-meta">
              <span>
                <i class="fas fa-clock"></i>
                {{ recipe.prepTime }}
              </span>
              <span>
                <i class="fas fa-user"></i>
                {{ recipe.servings }} servings
              </span>
              <span>
                <i class="fas fa-heart"></i>
                {{ recipe.votes }} votes
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import userService from '../services/userService'

export default {
  name: 'CategoryView',
  setup() {
    const route = useRoute()
    const category = ref(null)
    const recipes = ref([])
    const loading = ref(true)
    const searchQuery = ref('')
    const sortBy = ref('newest')

    const loadCategoryData = async () => {
      try {
        const categoryId = route.params.id
        const [categoryData, recipesData] = await Promise.all([
          userService.getCategory(categoryId),
          userService.getCategoryRecipes(categoryId)
        ])
        
        category.value = categoryData
        recipes.value = recipesData
      } catch (error) {
        console.error('Error loading category data:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredRecipes = computed(() => {
      let result = [...recipes.value]
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(recipe => 
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query)
        )
      }

      // Apply sorting
      switch (sortBy.value) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'popular':
          result.sort((a, b) => b.votes - a.votes)
          break
        case 'az':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'za':
          result.sort((a, b) => b.title.localeCompare(a.title))
          break
      }

      return result
    })

    onMounted(() => {
      loadCategoryData()
    })

    return {
      category,
      loading,
      searchQuery,
      sortBy,
      filteredRecipes
    }
  }
}
</script>

<style scoped>
.category-container {
  margin-top: 60px;
}

.category-banner {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.category-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.category-info h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.recipes-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.recipes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.recipes-header h2 {
  font-size: 2rem;
  color: #333;
}

.recipes-filters {
  display: flex;
  gap: 1rem;
}

.search-box input,
.sort-box select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.search-box input {
  min-width: 250px;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s;
}

.recipe-card:hover {
  transform: translateY(-5px);
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

.recipe-difficulty {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.recipe-difficulty.easy {
  background-color: #4caf50;
}

.recipe-difficulty.medium {
  background-color: #ff9800;
}

.recipe-difficulty.hard {
  background-color: #f44336;
}

.recipe-content {
  padding: 1.5rem;
}

.recipe-content h3 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.recipe-description {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.loading-state {
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

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .category-banner {
    height: 200px;
  }

  .category-info h1 {
    font-size: 2rem;
  }

  .recipes-section {
    padding: 0 1rem;
  }

  .recipes-header {
    flex-direction: column;
    align-items: stretch;
  }

  .recipes-filters {
    flex-direction: column;
  }

  .search-box input {
    width: 100%;
    min-width: unset;
  }
}
</style> 