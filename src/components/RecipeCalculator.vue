<!-- RecipeCalculator.vue -->
<template>
  <div class="recipe-calculator">
    <div class="servings-control">
      <h3>Adjust Recipe</h3>
      <div class="servings-input">
        <button 
          @click="updateServings(currentServings - 1)"
          :disabled="currentServings <= 1"
          class="adjust-btn"
        >
          <span class="material-icons">remove</span>
        </button>
        <div class="servings-display">
          <input 
            type="number" 
            v-model.number="currentServings"
            min="1"
            @change="handleServingInput"
          >
          <label>servings</label>
        </div>
        <button 
          @click="updateServings(currentServings + 1)"
          class="adjust-btn"
        >
          <span class="material-icons">add</span>
        </button>
      </div>
      <button 
        @click="resetServings"
        class="reset-btn"
        :disabled="currentServings === originalServings"
      >
        Reset to Original
      </button>
    </div>

    <div class="ingredients-list">
      <h3>Ingredients</h3>
      <transition-group name="list" tag="ul">
        <li v-for="ingredient in scaledIngredients" :key="ingredient.name" class="ingredient-item">
          <div class="ingredient-info">
            <span class="amount">{{ ingredient.amount }}</span>
            <div class="unit-selector">
              <select 
                v-model="preferredUnits[ingredient.name]"
                @change="handleUnitChange(ingredient.name, $event.target.value)"
              >
                <option :value="ingredient.unit">{{ ingredient.unit }}</option>
                <optgroup 
                  v-for="(units, type) in availableUnits"
                  :key="type"
                  :label="type"
                >
                  <option 
                    v-for="unit in units"
                    :key="unit"
                    :value="unit"
                    :disabled="!canConvert(ingredient.unit, unit)"
                  >
                    {{ unit }}
                  </option>
                </optgroup>
              </select>
            </div>
            <span class="name">{{ ingredient.name }}</span>
          </div>
        </li>
      </transition-group>
    </div>

    <div v-if="history.length > 0" class="history-section">
      <h3>Adjustment History</h3>
      <ul class="history-list">
        <li v-for="(entry, index) in history" :key="index">
          <span class="timestamp">{{ formatTime(entry.timestamp) }}</span>
          <span class="change">
            {{ entry.oldServings }} → {{ entry.newServings }} servings
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useIngredientCalculator } from '../composables/useIngredientCalculator'
import { computed, onMounted, watch } from 'vue'

export default {
  name: 'RecipeCalculator',
  props: {
    recipeIngredients: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(ingredient => 
          typeof ingredient.name === 'string' &&
          typeof ingredient.amount === 'number' &&
          typeof ingredient.unit === 'string'
        )
      }
    },
    defaultServings: {
      type: Number,
      default: 4
    }
  },

  setup(props) {
    const {
      currentServings,
      originalServings,
      scaledIngredients,
      preferredUnits,
      history,
      setIngredients,
      updateServings,
      setPreferredUnit,
      resetServings,
      convertMeasurement
    } = useIngredientCalculator(props.defaultServings)

    const availableUnits = {
      Volume: ['ml', 'l', 'tsp', 'tbsp', 'cup'],
      Weight: ['g', 'kg', 'oz', 'lb'],
      Count: ['piece', 'pieces']
    }

    // Watch for changes in recipe ingredients
    watch(() => props.recipeIngredients, (newIngredients) => {
      if (newIngredients && newIngredients.length > 0) {
        const validIngredients = newIngredients.map(ing => ({
          ...ing,
          unit: ing.unit.toLowerCase(),
          amount: Number(ing.amount)
        }))
        setIngredients(validIngredients)
      }
    }, { immediate: true })

    const handleServingInput = (event) => {
      const value = parseInt(event.target.value)
      if (value && value > 0) {
        updateServings(value)
      }
    }

    const handleUnitChange = (ingredientName, newUnit) => {
      if (newUnit) {
        setPreferredUnit(ingredientName, newUnit.toLowerCase())
      }
    }

    const canConvert = (fromUnit, toUnit) => {
      if (!fromUnit || !toUnit) return false
      
      // Convert units to lowercase for comparison
      const from = fromUnit.toLowerCase()
      const to = toUnit.toLowerCase()
      
      // Check if units are in the same category
      const getCategory = (unit) => {
        for (const [category, units] of Object.entries(availableUnits)) {
          if (units.map(u => u.toLowerCase()).includes(unit)) {
            return category
          }
        }
        return null
      }
      
      return getCategory(from) === getCategory(to)
    }

    const formatTime = (timestamp) => {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date(timestamp))
    }

    return {
      currentServings,
      originalServings,
      scaledIngredients,
      preferredUnits,
      history,
      availableUnits,
      updateServings,
      resetServings,
      handleServingInput,
      handleUnitChange,
      canConvert,
      formatTime
    }
  }
}
</script>

<style scoped>
.recipe-calculator {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.servings-control {
  margin-bottom: 24px;
  text-align: center;
}

.servings-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.servings-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.servings-display input {
  width: 80px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
}

.adjust-btn {
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.adjust-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.adjust-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background: transparent;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #d0d0d0;
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ingredients-list {
  margin-top: 24px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.ingredient-item:hover {
  background-color: #f9f9f9;
}

.ingredient-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.amount {
  font-weight: bold;
  min-width: 60px;
}

.unit-selector select {
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fff;
}

.name {
  margin-left: 8px;
}

.history-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  color: #666;
  font-size: 0.9em;
}

.timestamp {
  color: #999;
}

/* Transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style> 