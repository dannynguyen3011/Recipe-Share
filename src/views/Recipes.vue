<template>
  <div>
    <h2>All Recipes</h2>
    <button class="btn btn-primary mb-3" @click="showForm = !showForm">
      {{ showForm ? 'Hide' : 'Add Recipe' }}
    </button>

    <RecipeForm v-if="showForm" @save="addRecipe" />

    <div v-for="(recipe, index) in recipes" :key="index" class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">{{ recipe.title }}</h5>
        <p class="card-text">{{ recipe.description }}</p>
        <button class="btn btn-sm btn-outline-danger" @click="removeRecipe(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeForm from '../components/RecipeForm.vue'

export default {
  components: { RecipeForm },
  data() {
    return {
      recipes: [],
      showForm: false
    }
  },
  methods: {
    addRecipe(newRecipe) {
      this.recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      this.showForm = false;
    },
    removeRecipe(index) {
      this.recipes.splice(index, 1);
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }
  },
  mounted() {
    const saved = localStorage.getItem('recipes');
    this.recipes = saved ? JSON.parse(saved) : [];
  }
}
</script>
