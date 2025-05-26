<template>
  <div class="category-card">
    <router-link :to="'/category/' + category.id" class="card-link">
      <div class="card border-0">
        <div class="image-container">
          <img :src="category.image" :alt="category.name" class="rounded-circle">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ category.name }}</h5>
          <p class="card-text">{{ recipeCount }} Recipes</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true,
      validator: (prop) => {
        return prop.id && prop.name && prop.image
      }
    },
    recipeCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.category-card {
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.image-container {
  width: 150px;
  height: 150px;
  margin: 1rem auto;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 4px solid #f8f9fa;
  transition: transform 0.3s ease;
}

.category-card:hover .image-container img {
  transform: scale(1.05);
}

.card-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #666;
  font-size: 0.9rem;
}
</style> 