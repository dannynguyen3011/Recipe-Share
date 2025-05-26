<template>
  <div class="card">
    <div class="image-container">
      <img 
        :src="recipe.image" 
        :alt="recipe.title" 
        @error="handleImageError"
        class="image" 
      />
    </div>
    <div class="content">
      <h3 class="title">{{ recipe.title }}</h3>
      <div class="details">
        <span class="badge">{{ recipe.category }}</span>
        <span class="info">
          <i class="icon">⏱</i> {{ recipe.prepTime }} + {{ recipe.cookTime }}
        </span>
        <span class="info">
          <i class="icon">👥</i> Serves {{ recipe.servings }}
        </span>
        <span class="difficulty">{{ recipe.difficulty }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const ASSETS_URL = 'https://mercury.swin.edu.au/cos30043/s104181789/A3'

export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(event) {
      // Set a default recipe image when the original image fails to load
      event.target.src = `${ASSETS_URL}/images/recipes/placeholder.jpg`
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 1rem;
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.badge {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 500;
}

.info {
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon {
  font-style: normal;
}

.difficulty {
  color: #666;
  font-weight: 500;
}
</style> 