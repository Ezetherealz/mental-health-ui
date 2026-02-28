<template>
  <div class="app-container">
    <h1>🌟 My Wellness Tracker</h1>
    <MoodForm />
  </div>
</template>

<script>
import MoodForm from './components/MoodForm.vue';

export default {
  components: {
    MoodForm
  }
};
</script>

<style>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}
</style>