<template>
  <div class="news-container">
    <h1>Latest News</h1>
    
    <!-- Search and Filter Section -->
    <div class="search-filters">
      <div class="search-row">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title or content..."
          class="search-input"
          @input="handleSearch"
        />
        
        <input
          v-model="dateFilter"
          type="date"
          class="date-input"
          @input="handleSearch"
        />
        
        <select
          v-model="categoryFilter"
          class="category-select"
          @change="handleSearch"
        >
          <option value="">All Categories</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- News List -->
    <div class="news-list">
      <div v-for="item in paginatedNews" :key="item.id" class="news-item">
        <div class="news-header">
          <span class="news-date">{{ formatDate(item.date) }}</span>
          <span class="news-category">{{ item.category }}</span>
        </div>
        <h2 class="news-title">{{ item.title }}</h2>
        <p class="news-content">{{ item.content }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="currentPage--"
        class="page-button"
      >
        Previous
      </button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
        class="page-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import newsData from '../data/news.json'

export default {
  name: 'NewsView',
  data() {
    console.log('NewsView component loaded')
    return {
      news: newsData.news,
      searchQuery: '',
      dateFilter: '',
      categoryFilter: '',
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  mounted() {
    console.log('NewsView mounted', this.news)
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.news.map(item => item.category))]
    },
    filteredNews() {
      return this.news.filter(item => {
        const matchesSearch = this.searchQuery === '' || 
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(this.searchQuery.toLowerCase())
        
        const matchesDate = this.dateFilter === '' || 
          item.date === this.dateFilter
        
        const matchesCategory = this.categoryFilter === '' || 
          item.category === this.categoryFilter

        return matchesSearch && matchesDate && matchesCategory
      })
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage)
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredNews.slice(start, end)
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    handleSearch() {
      this.currentPage = 1 // Reset to first page when search/filter changes
    }
  }
}
</script>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 80px auto 0; /* Added top margin to account for fixed navbar */
  padding: 2rem;
}

.search-filters {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input,
.date-input,
.category-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input {
  flex: 2;
  min-width: 200px;
}

.date-input,
.category-select {
  flex: 1;
  min-width: 150px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.news-item {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.news-date {
  color: #666;
  font-size: 0.9rem;
}

.news-category {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.news-title {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.news-content {
  color: #666;
  line-height: 1.6;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.page-button {
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  color: #666;
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }
  
  .search-input,
  .date-input,
  .category-select {
    width: 100%;
  }
}
</style> 