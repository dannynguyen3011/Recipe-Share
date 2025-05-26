<template>
  <div>
    <h2>About This App</h2>
    <p>This app helps users share and find amazing recipes!</p>

    <div class="mb-3">
      <input v-model="firstName" placeholder="First Name" class="form-control mb-2">
      <input v-model="lastName" placeholder="Last Name" class="form-control mb-2">
      <p v-if="firstName || lastName">Welcome, {{ fullName }}!</p>
    </div>

    <div>
      <label><input type="radio" value="Mountain" v-model="selection" /> Mountain</label>
      <label class="ms-3"><input type="radio" value="Ocean" v-model="selection" /> Ocean</label>
      <div class="mt-3">
        <img v-if="selection" :src="imageUrl" class="img-fluid" alt="Selected" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <img :src="'/cos30043/s104181789/A3/assets/images/views/mountain.jpg'" class="img-fluid rounded" alt="Mountain View">
      </div>
      <div class="col-md-6">
        <img :src="'/cos30043/s104181789/A3/assets/images/views/ocean.jpg'" class="img-fluid rounded" alt="Ocean View">
      </div>
    </div>
  </div>
</template>

<script>
const BASE_URL = '/cos30043/s104181789/A3'

export default {
  name: 'About',
  data() {
    return {
      firstName: '',
      lastName: '',
      selection: ''
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`.trim()
    },
    imageUrl() {
      return this.selection === 'Mountain'
        ? `${BASE_URL}/assets/images/views/mountain.jpg`
        : `${BASE_URL}/assets/images/views/ocean.jpg`
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  margin: 0 -15px;
}

.col-md-6 {
  flex: 0 0 50%;
  padding: 0 15px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.rounded {
  border-radius: 8px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.ms-3 {
  margin-left: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
