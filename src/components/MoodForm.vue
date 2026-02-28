<template>
  <div class="form-box">
    <h2>Mood Check-in</h2>
    <input v-model="name" placeholder="Enter your full name" class="input-field" />
    <textarea v-model="mood" placeholder="How are you feeling today?" class="input-field"></textarea>
    
    <button @click="submitMood" :disabled="loading">
      {{ loading ? 'Asking AI Advisor...' : 'Submit Mood' }}
    </button>

    <div v-if="aiMessage" class="response-box">
      <strong>✨ AI Advisor:</strong> 
      <p>{{ aiMessage }}</p>
    </div>
    
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { name: '', mood: '', aiMessage: '', loading: false, error: '' };
  },
  methods: {
    async submitMood() {
      if (!this.name || !this.mood) {
        this.error = "Please fill in both fields!";
        return;
      }
      
      this.loading = true;
      this.error = '';
      this.aiMessage = '';
      
      try {
        const res = await api.post('/moods', {
          full_name: this.name,
          mood_text: this.mood
        });
        this.aiMessage = res.data.ai_message;
      } catch (err) {
        this.error = "Could not connect to the API. Check your Backend Terminal!";
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Main Container */
.form-box { 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  max-width: 500px; 
  margin: 20px auto;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

/* Inputs */
.input-field { 
  padding: 12px; 
  border-radius: 8px; 
  border: 2px solid #e0e0e0; 
  font-size: 1.1rem; 
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #42b983;
  outline: none;
}

/* Button */
button { 
  padding: 14px; 
  background-color: #42b983; 
  color: white; 
  border: none; 
  cursor: pointer; 
  border-radius: 8px; 
  font-size: 1.1rem;
  font-weight: 600;
}

button:disabled { 
  background-color: #cbd5e0; 
}

/* AI Response Box - High Readability */
.response-box { 
  margin-top: 25px; 
  padding: 20px; 
  background-color: #f0fff4; 
  border-left: 6px solid #42b983; 
  text-align: left; 
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.response-box strong {
  display: block;
  font-size: 1.2rem;
  color: #1a7f50;
  margin-bottom: 8px;
}

.response-box p {
  font-size: 1.3rem; /* Increased size for better readability */
  line-height: 1.6;
  color: #2d3748;
  margin: 0;
  font-weight: 500;
}

.error-msg {
  color: #e53e3e;
  font-weight: bold;
}
</style>