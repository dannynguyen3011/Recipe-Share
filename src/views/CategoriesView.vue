<template>
  <div class="categories-container">
    <div class="categories-header">
      <h1>Recipe Categories</h1>
      <p class="subtitle">Explore our diverse collection of recipes by category</p>
    </div>

    <div class="categories-grid">
      <router-link 
        v-for="category in categories" 
        :key="category.id"
        :to="'/category/' + category.id"
        class="category-card"
      >
        <div class="category-image">
          <img :src="category.image" :alt="category.name">
        </div>
        <div class="category-info">
          <h2>{{ category.name }}</h2>
          <p>{{ getRecipeCount(category.name) }} Recipes</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import userService from '../services/userService'

export default {
  name: 'CategoriesView',
  setup() {
    const categories = ref([])
    const recipeCounts = ref({})

    const getRecipeCount = (categoryName) => {
      return recipeCounts.value[categoryName] || 0
    }

    onMounted(async () => {
      try {
        const [categoriesData, counts] = await Promise.all([
          userService.getCategories(),
          userService.getCategoryRecipeCounts()
        ])
        categories.value = categoriesData
        recipeCounts.value = counts
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    })

    return {
      categories,
      getRecipeCount
    }
  }
}
</script>

<style scoped>
.categories-container {
  max-width: 1200px;
  margin: 80px auto 2rem;
  padding: 0 1.5rem;
}

.categories-header {
  text-align: center;
  margin-bottom: 3rem;
}

.categories-header h1 {
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 1rem;
  font-weight: 600;
}

.subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  padding: 1rem 0;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-info {
  text-align: center;
}

.category-info h2 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.category-info p {
  color: #718096;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .categories-container {
    margin-top: 60px;
    padding: 0 1rem;
  }

  .categories-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .categories-grid {
    gap: 2rem;
  }

  .category-image {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .categories-header h1 {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .category-image {
    width: 150px;
    height: 150px;
  }

  .category-info h2 {
    font-size: 1.25rem;
  }
}
</style> 