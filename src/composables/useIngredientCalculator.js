import { ref, computed, watch } from 'vue'

const measurementUnits = {
  volume: ['ml', 'l', 'tsp', 'tbsp', 'cup'],
  weight: ['g', 'kg', 'oz', 'lb'],
  count: ['piece', 'pieces']
}

const conversionRates = {
  // Volume conversions
  ml: { l: 0.001, tsp: 0.2, tbsp: 0.0667, cup: 0.004167 },
  l: { ml: 1000, tsp: 200, tbsp: 66.7, cup: 4.167 },
  tsp: { ml: 5, l: 0.005, tbsp: 0.333, cup: 0.0208 },
  tbsp: { ml: 15, l: 0.015, tsp: 3, cup: 0.0625 },
  cup: { ml: 240, l: 0.24, tsp: 48, tbsp: 16 },
  
  // Weight conversions
  g: { kg: 0.001, oz: 0.03527, lb: 0.002205 },
  kg: { g: 1000, oz: 35.274, lb: 2.205 },
  oz: { g: 28.3495, kg: 0.02835, lb: 0.0625 },
  lb: { g: 453.592, kg: 0.453592, oz: 16 }
}

export function useIngredientCalculator(initialServings = 4) {
  const currentServings = ref(initialServings)
  const originalServings = ref(initialServings)
  const preferredUnits = ref({})
  const ingredients = ref([])
  const history = ref([])

  // Computed property for scaled ingredients
  const scaledIngredients = computed(() => {
    return ingredients.value.map(ingredient => {
      if (!ingredient || typeof ingredient.amount !== 'number') {
        console.warn('Invalid ingredient:', ingredient)
        return ingredient
      }

      const scaleFactor = currentServings.value / originalServings.value
      const newAmount = parseFloat((ingredient.amount * scaleFactor).toFixed(2))
      
      // Convert to preferred unit if set
      const preferredUnit = preferredUnits.value[ingredient.name]
      if (preferredUnit && 
          preferredUnit !== ingredient.unit && 
          typeof ingredient.unit === 'string') {
        return {
          ...ingredient,
          amount: convertMeasurement(newAmount, ingredient.unit.toLowerCase(), preferredUnit.toLowerCase()),
          unit: preferredUnit
        }
      }

      return {
        ...ingredient,
        amount: newAmount
      }
    })
  })

  // Convert between measurement units
  const convertMeasurement = (value, fromUnit, toUnit) => {
    if (!fromUnit || !toUnit || fromUnit === toUnit) return value
    
    // Ensure units are lowercase
    fromUnit = fromUnit.toLowerCase()
    toUnit = toUnit.toLowerCase()
    
    // Direct conversion
    if (conversionRates[fromUnit]?.[toUnit]) {
      return parseFloat((value * conversionRates[fromUnit][toUnit]).toFixed(2))
    }
    
    // Convert through base unit if direct conversion not available
    const baseUnit = getBaseUnit(fromUnit)
    if (baseUnit) {
      const toBase = value * conversionRates[fromUnit][baseUnit]
      const fromBase = toBase * conversionRates[baseUnit][toUnit]
      return parseFloat(fromBase.toFixed(2))
    }
    
    return value
  }

  // Get the base unit for a given unit type
  const getBaseUnit = (unit) => {
    if (!unit) return null
    unit = unit.toLowerCase()
    if (measurementUnits.volume.includes(unit)) return 'ml'
    if (measurementUnits.weight.includes(unit)) return 'g'
    return null
  }

  // Set ingredients with validation
  const setIngredients = (newIngredients) => {
    if (!Array.isArray(newIngredients)) {
      console.warn('Invalid ingredients data:', newIngredients)
      return
    }

    ingredients.value = newIngredients.map(ing => {
      if (!ing || typeof ing !== 'object') return null
      return {
        ...ing,
        amount: typeof ing.amount === 'number' ? ing.amount : parseFloat(ing.amount),
        unit: typeof ing.unit === 'string' ? ing.unit.toLowerCase() : 'piece'
      }
    }).filter(Boolean)
  }

  // Update servings with history tracking
  const updateServings = (newServings) => {
    if (!newServings || newServings < 1) return
    
    history.value.push({
      timestamp: new Date(),
      oldServings: currentServings.value,
      newServings: newServings
    })
    
    currentServings.value = newServings
  }

  // Set preferred unit for an ingredient
  const setPreferredUnit = (ingredientName, unit) => {
    if (!ingredientName || !unit) return
    
    unit = unit.toLowerCase()
    if (!measurementUnits.volume.includes(unit) && 
        !measurementUnits.weight.includes(unit) && 
        !measurementUnits.count.includes(unit)) {
      console.warn('Invalid measurement unit:', unit)
      return
    }
    
    preferredUnits.value = {
      ...preferredUnits.value,
      [ingredientName]: unit
    }
  }

  // Reset to original servings
  const resetServings = () => {
    currentServings.value = originalServings.value
    history.value = []
  }

  // Watch for changes in current servings
  watch(currentServings, (newServings, oldServings) => {
    if (Math.abs(newServings - oldServings) > 10) {
      console.warn('Large serving size change detected')
    }
  })

  return {
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
  }
} 