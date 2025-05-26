import usersData from '../data/users.json'

// Base URL for assets
export const ASSETS_URL = 'https://mercury.swin.edu.au/cos30043/s104181789/A3'

// Mock data
const mockCategories = [
  {
    id: '1',
    name: 'Italian',
    image: `${ASSETS_URL}/images/categories/italian.jpg`,
    description: 'Traditional Italian cuisine'
  },
  {
    id: '2',
    name: 'Mexican',
    image: `${ASSETS_URL}/images/categories/mexican.jpg`,
    description: 'Authentic Mexican dishes'
  },
  {
    id: '3',
    name: 'Asian',
    image: `${ASSETS_URL}/images/categories/asian.jpg`,
    description: 'Diverse Asian flavors'
  },
  {
    id: '4',
    name: 'Desserts',
    image: `${ASSETS_URL}/images/categories/desserts.jpg`,
    description: 'Sweet treats and baked goods'
  },
  {
    id: '5',
    name: 'Mediterranean',
    image: `${ASSETS_URL}/images/categories/mediterranean.jpg`,
    description: 'Healthy Mediterranean cuisine'
  },
  {
    id: '6',
    name: 'American',
    image: `${ASSETS_URL}/images/categories/american.jpg`,
    description: 'Classic American comfort food'
  }
]

const mockRecipeCounts = {
  'Italian': 25,
  'Mexican': 18,
  'Asian': 30,
  'Desserts': 22,
  'Mediterranean': 15,
  'American': 20
}

const mockRecipes = {
  '1': [ // Italian recipes
    {
      id: '101',
      title: 'Classic Margherita Pizza',
      category: 'Italian',
      prepTime: '30 mins',
      cookTime: '15 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Traditional Neapolitan pizza with fresh mozzarella, tomatoes, and basil',
      image: `${ASSETS_URL}/images/recipes/margherita-pizza.jpg`,
      votes: 150,
      createdAt: '2024-01-01'
    },
    {
      id: '102',
      title: 'Homemade Pasta Carbonara',
      category: 'Italian',
      prepTime: '20 mins',
      cookTime: '15 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Creamy pasta dish with eggs, cheese, pancetta, and black pepper',
      image: `${ASSETS_URL}/images/recipes/carbonara.jpg`,
      votes: 120,
      createdAt: '2024-01-02'
    },
    {
      id: '103',
      title: 'Lasagna alla Bolognese',
      category: 'Italian',
      prepTime: '45 mins',
      cookTime: '60 mins',
      servings: 8,
      difficulty: 'Hard',
      description: 'Classic Italian lasagna with rich meat sauce and creamy béchamel',
      image: `${ASSETS_URL}/images/recipes/lasagna.jpg`,
      votes: 135,
      createdAt: '2024-01-03'
    },
    {
      id: '104',
      title: 'Risotto ai Funghi',
      category: 'Italian',
      prepTime: '15 mins',
      cookTime: '30 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Creamy mushroom risotto with Parmesan and white wine',
      image: `${ASSETS_URL}/images/recipes/risotto.jpg`,
      votes: 95,
      createdAt: '2024-01-04'
    },
    {
      id: '105',
      title: 'Osso Buco',
      category: 'Italian',
      prepTime: '30 mins',
      cookTime: '2.5 hrs',
      servings: 6,
      difficulty: 'Hard',
      description: 'Braised veal shanks in white wine, broth, and gremolata',
      image: `${ASSETS_URL}/images/recipes/osso-buco.jpg`,
      votes: 88,
      createdAt: '2024-01-05'
    }
  ],
  '2': [ // Mexican recipes
    {
      id: '201',
      title: 'Beef Tacos',
      category: 'Mexican',
      prepTime: '25 mins',
      cookTime: '20 mins',
      servings: 6,
      difficulty: 'Easy',
      description: 'Authentic Mexican tacos with seasoned ground beef and fresh toppings',
      image: `${ASSETS_URL}/images/recipes/street-tacos.jpg`,
      votes: 110,
      createdAt: '2024-01-05'
    },
    {
      id: '202',
      title: 'Enchiladas Verdes',
      category: 'Mexican',
      prepTime: '30 mins',
      cookTime: '25 mins',
      servings: 6,
      difficulty: 'Medium',
      description: 'Chicken enchiladas with green salsa, cheese, and cream',
      image: `${ASSETS_URL}/images/recipes/enchiladas.jpg`,
      votes: 95,
      createdAt: '2024-01-06'
    },
    {
      id: '203',
      title: 'Guacamole',
      category: 'Mexican',
      prepTime: '15 mins',
      cookTime: '0 mins',
      servings: 8,
      difficulty: 'Easy',
      description: 'Fresh avocado dip with lime, cilantro, and spices',
      image: `${ASSETS_URL}/images/recipes/guacamole.jpg`,
      votes: 85,
      createdAt: '2024-01-07'
    },
    {
      id: '204',
      title: 'Pozole Rojo',
      category: 'Mexican',
      prepTime: '45 mins',
      cookTime: '3 hrs',
      servings: 8,
      difficulty: 'Medium',
      description: 'Traditional Mexican hominy soup with pork and red chile sauce',
      image: `${ASSETS_URL}/images/recipes/pozole.jpg`,
      votes: 88,
      createdAt: '2024-01-08'
    },
    {
      id: '205',
      title: 'Chiles Rellenos',
      category: 'Mexican',
      prepTime: '40 mins',
      cookTime: '20 mins',
      servings: 4,
      difficulty: 'Hard',
      description: 'Stuffed poblano peppers with cheese, battered and fried',
      image: `${ASSETS_URL}/images/recipes/chiles-rellenos.jpg`,
      votes: 75,
      createdAt: '2024-01-06'
    }
  ],
  '3': [ // Asian recipes
    {
      id: '301',
      title: 'Chicken Pad Thai',
      category: 'Asian',
      prepTime: '30 mins',
      cookTime: '15 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Classic Thai stir-fried rice noodles with chicken and peanuts',
      image: `${ASSETS_URL}/images/recipes/pad-thai.jpg`,
      votes: 110,
      createdAt: '2024-01-09'
    },
    {
      id: '302',
      title: 'Sushi Rolls',
      category: 'Asian',
      prepTime: '45 mins',
      cookTime: '30 mins',
      servings: 6,
      difficulty: 'Hard',
      description: 'Homemade sushi rolls with fresh fish and vegetables',
      image: `${ASSETS_URL}/images/recipes/sushi-rolls.jpg`,
      votes: 85,
      createdAt: '2024-01-10'
    },
    {
      id: '303',
      title: 'Korean BBQ Short Ribs',
      category: 'Asian',
      prepTime: '20 mins',
      cookTime: '25 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Marinated and grilled Korean-style beef short ribs',
      image: `${ASSETS_URL}/images/recipes/korean-bbq.jpg`,
      votes: 95,
      createdAt: '2024-01-11'
    },
    {
      id: '304',
      title: 'Ramen Noodle Soup',
      category: 'Asian',
      prepTime: '30 mins',
      cookTime: '3 hrs',
      servings: 4,
      difficulty: 'Hard',
      description: 'Japanese ramen with rich broth, soft-boiled egg, and chashu pork',
      image: `${ASSETS_URL}/images/recipes/ramen.jpg`,
      votes: 130,
      createdAt: '2024-01-12'
    },
    {
      id: '305',
      title: 'Kung Pao Chicken',
      category: 'Asian',
      prepTime: '20 mins',
      cookTime: '15 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Spicy stir-fried chicken with peanuts and vegetables',
      image: `${ASSETS_URL}/images/recipes/kung-pao.jpg`,
      votes: 88,
      createdAt: '2024-01-13'
    }
  ],
  '4': [ // Desserts
    {
      id: '401',
      title: 'Chocolate Lava Cake',
      category: 'Desserts',
      prepTime: '20 mins',
      cookTime: '12 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Decadent chocolate cake with a molten center',
      image: `${ASSETS_URL}/images/recipes/chocolate-lava.jpg`,
      votes: 130,
      createdAt: '2024-01-14'
    },
    {
      id: '402',
      title: 'Vanilla Bean Cheesecake',
      category: 'Desserts',
      prepTime: '30 mins',
      cookTime: '60 mins',
      servings: 12,
      difficulty: 'Medium',
      description: 'Creamy cheesecake with real vanilla beans',
      image: `${ASSETS_URL}/images/recipes/vanilla-bean.jpg`,
      votes: 95,
      createdAt: '2024-01-15'
    },
    {
      id: '403',
      title: 'Tiramisu',
      category: 'Desserts',
      prepTime: '40 mins',
      cookTime: '0 mins',
      servings: 8,
      difficulty: 'Medium',
      description: 'Classic Italian coffee-flavored dessert',
      image: `${ASSETS_URL}/images/recipes/tiramisu.jpg`,
      votes: 115,
      createdAt: '2024-01-16'
    },
    {
      id: '404',
      title: 'Apple Pie',
      category: 'Desserts',
      prepTime: '45 mins',
      cookTime: '50 mins',
      servings: 8,
      difficulty: 'Medium',
      description: 'Traditional American apple pie with flaky crust',
      image: `${ASSETS_URL}/images/recipes/apple-pie.jpg`,
      votes: 88,
      createdAt: '2024-01-17'
    },
    {
      id: '405',
      title: 'Crème Brûlée',
      category: 'Desserts',
      prepTime: '20 mins',
      cookTime: '35 mins',
      servings: 6,
      difficulty: 'Hard',
      description: 'Classic French custard with caramelized sugar top',
      image: `${ASSETS_URL}/images/recipes/creme-brulee.jpg`,
      votes: 92,
      createdAt: '2024-01-18'
    }
  ],
  '5': [ // Mediterranean recipes
    {
      id: '501',
      title: 'Greek Salad',
      category: 'Mediterranean',
      prepTime: '15 mins',
      cookTime: '0 mins',
      servings: 4,
      difficulty: 'Easy',
      description: 'Fresh salad with tomatoes, cucumbers, olives, and feta cheese',
      image: `${ASSETS_URL}/images/recipes/greek-salad.jpg`,
      votes: 75,
      createdAt: '2024-01-19'
    },
    {
      id: '502',
      title: 'Hummus',
      category: 'Mediterranean',
      prepTime: '10 mins',
      cookTime: '0 mins',
      servings: 8,
      difficulty: 'Easy',
      description: 'Classic chickpea dip with tahini and olive oil',
      image: `${ASSETS_URL}/images/recipes/hummus.jpg`,
      votes: 65,
      createdAt: '2024-01-20'
    },
    {
      id: '503',
      title: 'Moussaka',
      category: 'Mediterranean',
      prepTime: '45 mins',
      cookTime: '60 mins',
      servings: 8,
      difficulty: 'Hard',
      description: 'Traditional Greek casserole with eggplant and ground meat',
      image: `${ASSETS_URL}/images/recipes/moussaka.jpg`,
      votes: 88,
      createdAt: '2024-01-21'
    },
    {
      id: '504',
      title: 'Shakshuka',
      category: 'Mediterranean',
      prepTime: '15 mins',
      cookTime: '25 mins',
      servings: 4,
      difficulty: 'Medium',
      description: 'Eggs poached in spiced tomato sauce with peppers',
      image: `${ASSETS_URL}/images/recipes/shakshuka.jpg`,
      votes: 92,
      createdAt: '2024-01-22'
    },
    {
      id: '505',
      title: 'Falafel',
      category: 'Mediterranean',
      prepTime: '20 mins',
      cookTime: '15 mins',
      servings: 6,
      difficulty: 'Medium',
      description: 'Crispy chickpea fritters with herbs and spices',
      image: `${ASSETS_URL}/images/recipes/falafel.jpg`,
      votes: 78,
      createdAt: '2024-01-23'
    }
  ],
  '6': [ // American recipes
    {
      id: '601',
      title: 'Classic Cheeseburger',
      category: 'American',
      prepTime: '20 mins',
      cookTime: '15 mins',
      servings: 4,
      difficulty: 'Easy',
      description: 'Juicy beef burger with melted cheese and fresh toppings',
      image: `${ASSETS_URL}/images/recipes/cheeseburger.jpg`,
      votes: 140,
      createdAt: '2024-01-24'
    },
    {
      id: '602',
      title: 'Mac and Cheese',
      category: 'American',
      prepTime: '15 mins',
      cookTime: '25 mins',
      servings: 6,
      difficulty: 'Easy',
      description: 'Creamy macaroni and cheese with a crispy top',
      image: `${ASSETS_URL}/images/recipes/mac-and-cheese.jpg`,
      votes: 100,
      createdAt: '2024-01-25'
    },
    {
      id: '603',
      title: 'BBQ Pulled Pork',
      category: 'American',
      prepTime: '30 mins',
      cookTime: '8 hrs',
      servings: 8,
      difficulty: 'Medium',
      description: 'Slow-cooked pulled pork with homemade BBQ sauce',
      image: `${ASSETS_URL}/images/recipes/bbq-pulled-pork.jpg`,
      votes: 115,
      createdAt: '2024-01-26'
    },
    {
      id: '604',
      title: 'Buffalo Wings',
      category: 'American',
      prepTime: '15 mins',
      cookTime: '45 mins',
      servings: 6,
      difficulty: 'Medium',
      description: 'Crispy chicken wings tossed in spicy buffalo sauce',
      image: `${ASSETS_URL}/images/recipes/buffalo-wings.jpg`,
      votes: 95,
      createdAt: '2024-01-27'
    },
    {
      id: '605',
      title: 'New England Clam Chowder',
      category: 'American',
      prepTime: '25 mins',
      cookTime: '40 mins',
      servings: 6,
      difficulty: 'Medium',
      description: 'Creamy soup with clams, potatoes, and bacon',
      image: `${ASSETS_URL}/images/recipes/clam-chowder.jpg`,
      votes: 82,
      createdAt: '2024-01-28'
    }
  ]
}

// API endpoints
const API_BASE_URL = 'https://mercury.swin.edu.au/cos30043/s104181789/A3/backend/api'
const ENDPOINTS = {
  LOGIN: '/login.php',
  SIGNUP: '/api_signup.php',
  RECIPE_ACTIONS: '/api_recipe_actions.php'
}

class UserService {
  constructor() {
    // Initialize from localStorage if available
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user && user.id && user.email) {
          localStorage.setItem('isAuthenticated', 'true')
        } else {
          this.logout()
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        this.logout()
      }
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.success && data.user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        
        // Dispatch auth state change event
        window.dispatchEvent(new CustomEvent('auth-state-changed', {
          detail: { isAuthenticated: true, user: data.user }
        }))

        return data.user
      } else {
        throw new Error(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      this.logout()
      throw error
    }
  }

  async register(userData) {
    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      if (data.success && data.user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        
        // Dispatch auth state change event
        window.dispatchEvent(new CustomEvent('auth-state-changed', {
          detail: { isAuthenticated: true, user: data.user }
        }))

        return data.user
      } else {
        throw new Error(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  logout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
    
    // Dispatch auth state change event
    window.dispatchEvent(new CustomEvent('auth-state-changed', {
      detail: { isAuthenticated: false, user: null }
    }))
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('currentUser')
      if (!userStr) return null
      
      const user = JSON.parse(userStr)
      if (!user || !user.id || !user.email) {
        this.logout()
        return null
      }
      
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      this.logout()
      return null
    }
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true' && this.getCurrentUser() !== null
  }

  async saveRecipe(recipeId) {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to save recipes')
    }

    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.RECIPE_ACTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          action: 'save'
        }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save recipe')
      }

      // Update local user data
      const user = this.getCurrentUser()
      if (!user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.push(recipeId)
        localStorage.setItem('currentUser', JSON.stringify(user))
      }

      return data
    } catch (error) {
      console.error('Save recipe error:', error)
      throw error
    }
  }

  async unsaveRecipe(recipeId) {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to unsave recipes')
    }

    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.RECIPE_ACTIONS, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          action: 'save'
        }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unsave recipe')
      }

      // Update local user data
      const user = this.getCurrentUser()
      user.savedRecipes = user.savedRecipes.filter(id => id !== recipeId)
      localStorage.setItem('currentUser', JSON.stringify(user))

      return data
    } catch (error) {
      console.error('Unsave recipe error:', error)
      throw error
    }
  }

  async voteRecipe(recipeId) {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to vote for recipes')
    }

    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.RECIPE_ACTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          action: 'vote'
        }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to vote for recipe')
      }

      // Update local user data
      const user = this.getCurrentUser()
      if (!user.votedRecipes.includes(recipeId)) {
        user.votedRecipes.push(recipeId)
        localStorage.setItem('currentUser', JSON.stringify(user))
      }

      return data
    } catch (error) {
      console.error('Vote recipe error:', error)
      throw error
    }
  }

  async unvoteRecipe(recipeId) {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to unvote recipes')
    }

    try {
      const response = await fetch(API_BASE_URL + ENDPOINTS.RECIPE_ACTIONS, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          action: 'vote'
        }),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unvote recipe')
      }

      // Update local user data
      const user = this.getCurrentUser()
      user.votedRecipes = user.votedRecipes.filter(id => id !== recipeId)
      localStorage.setItem('currentUser', JSON.stringify(user))

      return data
    } catch (error) {
      console.error('Unvote recipe error:', error)
      throw error
    }
  }

  async getSavedRecipes() {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to view saved recipes')
    }

    const user = this.getCurrentUser()
    return user.savedRecipes || []
  }

  async getVotedRecipes() {
    if (!this.isAuthenticated()) {
      throw new Error('You must be logged in to view voted recipes')
    }

    const user = this.getCurrentUser()
    return user.votedRecipes || []
  }

  // Keep the mock data methods for now
  async getCategories() {
    return mockCategories
  }

  async getCategoryRecipeCounts() {
    return mockRecipeCounts
  }

  async getCategory(id) {
    return mockCategories.find(cat => cat.id === id)
  }

  async getRecipes() {
    return Object.values(mockRecipes).flat()
  }

  async getCategoryRecipes(categoryId) {
    return mockRecipes[categoryId] || []
  }

  async getRecipe(recipeId) {
    for (const categoryRecipes of Object.values(mockRecipes)) {
      const recipe = categoryRecipes.find(r => r.id === recipeId)
      if (recipe) {
        const user = this.getCurrentUser()
        return {
          ...recipe,
          hasVoted: user ? user.votedRecipes.includes(recipeId) : false,
          isSaved: user ? user.savedRecipes.includes(recipeId) : false,
          ingredients: [
            { name: 'All-purpose flour', amount: 200, unit: 'g' },
            { name: 'Sugar', amount: 3, unit: 'tbsp' },
            { name: 'Milk', amount: 1, unit: 'cup' },
            { name: 'Eggs', amount: 2, unit: 'piece' },
            { name: 'Butter', amount: 100, unit: 'g' },
            { name: 'Vanilla extract', amount: 1, unit: 'tsp' }
          ],
          instructions: [
            'Preheat the oven to 180°C (350°F).',
            'Mix all dry ingredients in a large bowl.',
            'Add wet ingredients and stir until well combined.',
            'Pour into prepared baking dish.',
            'Bake for 30-35 minutes or until done.'
          ],
          nutritionFacts: {
            calories: '350 kcal',
            protein: '8g',
            carbohydrates: '45g',
            fat: '14g',
            fiber: '3g'
          },
          tips: [
            'For best results, bring ingredients to room temperature before starting.',
            'Store in an airtight container for up to 3 days.',
            'Can be frozen for up to 1 month.'
          ]
        }
      }
    }
    throw new Error('Recipe not found')
  }

  async deleteAccount() {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-account.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete account');
      }

      // Clear local storage and session data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('auth-state-changed', {
        detail: {
          isAuthenticated: false,
          user: null
        }
      }));

      return true;
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  }
}

export default new UserService() 