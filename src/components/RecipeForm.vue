<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="Recipe Title" class="form-control mb-2" required />
    <textarea v-model="description" placeholder="Description" class="form-control mb-2" required></textarea>
    <button type="submit" class="btn btn-success">Save</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    submit() {
      this.$emit('save', {
        title: this.title,
        description: this.description
      });
      this.title = '';
      this.description = '';
    }
  }
}
</script>
