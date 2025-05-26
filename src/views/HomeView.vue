<template>
  <div class="home">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading recipes...</p>
    </div>

    <template v-else>
      <!-- Hero Carousel Section -->
      <section v-if="featuredRecipes.length > 0" class="hero-section">
        <div class="carousel">
          <div class="carousel-slide active">
            <img 
              :src="featuredRecipes[currentSlide].image" 
              :alt="featuredRecipes[currentSlide].title"
              @error="handleImageError"
              class="carousel-image"
            >
            <div class="carousel-content">
              <h1>{{ featuredRecipes[currentSlide].title }}</h1>
              <p>{{ featuredRecipes[currentSlide].description }}</p>
              <router-link :to="'/recipe/' + featuredRecipes[currentSlide].id" class="btn-primary">View Recipe</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Categories Section -->
      <section v-if="categories.length > 0" class="categories-section">
        <div class="section-header">
          <h2>Popular Categories</h2>
          <router-link to="/categories" class="view-all">View All Categories</router-link>
        </div>
        <div class="categories-grid">
          <router-link 
            v-for="category in categories" 
            :key="category.id"
            :to="'/category/' + category.id"
            class="category-card"
          >
            <img 
              :src="category.image" 
              :alt="category.name"
              @error="handleImageError"
              class="category-image"
            >
            <div class="category-content">
              <h3>{{ category.name }}</h3>
              <p>{{ getRecipeCount(category.name) }} Recipes</p>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Super Delicious Section -->
      <section v-if="recipes.length > 0" class="recipes-section">
        <div class="section-header">
          <h2>Super Delicious</h2>
          <router-link to="/recipes" class="view-all">View All Recipes</router-link>
        </div>
        <div class="recipes-grid">
          <router-link 
            v-for="recipe in recipes" 
            :key="recipe.id"
            :to="'/recipe/' + recipe.id"
            class="recipe-card"
          >
            <div class="recipe-image">
              <img 
                :src="recipe.image" 
                :alt="recipe.title"
                @error="handleImageError"
                class="recipe-img"
              >
              <div class="recipe-meta">
                <span><i class="fas fa-clock"></i> {{ recipe.prepTime }}</span>
                <span><i class="fas fa-user-friends"></i> {{ recipe.servings }}</span>
              </div>
            </div>
            <div class="recipe-content">
              <h3>{{ recipe.title }}</h3>
              <p>{{ recipe.description }}</p>
              <div class="recipe-footer">
                <span class="difficulty">{{ recipe.difficulty }}</span>
                <span class="votes"><i class="fas fa-heart"></i> {{ recipe.votes }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest recipes and cooking tips delivered straight to your inbox!</p>
          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Enter your email address"
              required
            >
            <button type="submit" class="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import userService, { ASSETS_URL } from '../services/userService'

export default {
  name: 'HomeView',
  setup() {
    const currentSlide = ref(0)
    const featuredRecipes = ref([])
    const categories = ref([])
    const recipes = ref([])
    const email = ref('')
    const recipeCounts = ref({})
    const isLoading = ref(true)

    const getRecipeCount = (categoryName) => {
      return recipeCounts.value[categoryName] || 0
    }

    const handleImageError = (event) => {
      // Set a default placeholder image when the original image fails to load
      event.target.src = `${ASSETS_URL}/images/placeholder.jpg`
      // Add a class to indicate error state
      event.target.classList.add('image-error')
    }

    const handleSubscribe = async () => {
      try {
        await userService.subscribeNewsletter(email.value)
        alert('Thank you for subscribing!')
        email.value = ''
      } catch (error) {
        alert('Failed to subscribe: ' + error.message)
      }
    }

    onMounted(async () => {
      try {
        isLoading.value = true
        // Load all data in parallel
        const [categoriesData, recipesData, counts] = await Promise.all([
          userService.getCategories(),
          userService.getRecipes(),
          userService.getCategoryRecipeCounts()
        ])

        categories.value = categoriesData
        recipeCounts.value = counts
        
        // Get featured recipes (first 5 recipes)
        featuredRecipes.value = recipesData.slice(0, 5)
        
        // Get random recipes for Super Delicious section
        const shuffled = [...recipesData].sort(() => 0.5 - Math.random())
        recipes.value = shuffled.slice(0, 6)
      } catch (error) {
        console.error('Error loading home page data:', error)
      } finally {
        isLoading.value = false
      }
    })

    return {
      currentSlide,
      featuredRecipes,
      categories,
      recipes,
      email,
      recipeCounts,
      isLoading,
      getRecipeCount,
      handleSubscribe,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Add loading state styles */
.loading-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Image styles */
.carousel-image,
.category-image,
.recipe-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-image {
  height: 500px;
}

.category-image {
  height: 200px;
  border-radius: 8px;
}

.recipe-img {
  height: 250px;
  border-radius: 8px 8px 0 0;
}

/* Add hover effects */
.category-card:hover .category-image,
.recipe-card:hover .recipe-img {
  transform: scale(1.05);
}

/* Hero Carousel Section */
.hero-section {
  margin-top: 60px;
}

.carousel {
  position: relative;
  height: 600px;
  background: #000;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.carousel-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.carousel-content p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.5);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
}

.carousel-indicators button.active {
  background: white;
  transform: scale(1.2);
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 2rem;
  color: #333;
}

.view-all {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

/* Categories Section */
.categories-section {
  margin-bottom: 60px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.category-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.category-content h3 {
  margin-bottom: 5px;
}

/* Recipes Section */
.recipes-section {
  margin-bottom: 60px;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  position: relative;
}

.recipe-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: space-around;
}

.recipe-content {
  padding: 20px;
}

.recipe-content h3 {
  margin-bottom: 10px;
  color: #333;
}

.recipe-content p {
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.difficulty {
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.votes {
  color: #f44336;
}

/* Newsletter Section */
.newsletter-section {
  background: #f8f9fa;
  padding: 60px 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 40px;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  margin-bottom: 15px;
  color: #333;
}

.newsletter-content p {
  color: #666;
  margin-bottom: 30px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.btn-primary {
  background: #1976d2;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background: #1565c0;
}

@media (max-width: 768px) {
  .carousel-slide img {
    height: 300px;
  }

  .slide-content h2 {
    font-size: 1.8rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }
}

.image-error {
  opacity: 0.8;
  filter: grayscale(1);
}
</style> 