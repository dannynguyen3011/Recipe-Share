<template>
  <section class="top-categories">
    <div class="section-header">
      <h2>Popular Categories</h2>
      <p>Discover our most loved recipe collections</p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading categories...</p>
    </div>

    <div v-else class="categories-grid">
      <CategoryCard
        v-for="category in topCategories"
        :key="category.id"
        :category="category"
        :recipe-count="category.recipeCount"
      />
    </div>

    <div class="view-all">
      <router-link to="/categories" class="btn-view-all">
        View All Categories
      </router-link>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CategoryCard from './CategoryCard.vue'
import userService from '../services/userService'

export default {
  name: 'TopCategories',
  components: {
    CategoryCard
  },
  setup() {
    const categories = ref([])
    const loading = ref(true)

    const topCategories = computed(() => {
      return categories.value
        .sort((a, b) => b.recipeCount - a.recipeCount)
        .slice(0, 6)
    })

    onMounted(async () => {
      try {
        // Load categories and their recipe counts
        const [categoriesData, recipeCounts] = await Promise.all([
          userService.getCategories(),
          userService.getCategoryRecipeCounts()
        ])

        // Combine the data
        categories.value = categoriesData.map(category => ({
          ...category,
          recipeCount: recipeCounts[category.name] || 0
        }))
      } catch (error) {
        console.error('Error loading top categories:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      topCategories
    }
  }
}
</script>

<style scoped>
.top-categories {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
}

.categories-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.view-all {
  text-align: center;
  margin-top: 3rem;
}

.btn-view-all {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-view-all:hover {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .top-categories {
    padding: 3rem 1rem;
  }

  .section-header h2 {
    font-size: 1.75rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style> 