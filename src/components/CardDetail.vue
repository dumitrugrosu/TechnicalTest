<template>
  <div>
    <h2>Edit Card</h2>
    <input v-model="card.name" placeholder="Name" @input="onInputChange" />
    <textarea v-model="card.dataFormatted" placeholder="Data" @input="onInputChange"></textarea>
    <button @click="save" :disabled="!isModified">Save</button>
    <button @click="discard" :disabled="!isModified">Discard</button>
    <button @click="deleteCard">Delete</button>
    <router-link to="/" class="home-button">Home</router-link>

    <div v-if="showSaveNotification" class="save-notification">
      Card has been saved!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      card: {
        id: '',
        name: '',
        data: {},
        dataFormatted: '' 
      },
      originalCard: {},
      isModified: false,
      showSaveNotification: false 
    };
  },
  created() {
    this.fetchCard();
  },
  methods: {
    fetchCard() {
      const id = this.$route.params.id;
      axios.get(`https://api.restful-api.dev/objects/${id}`)
        .then(response => {
          this.card = response.data;
          this.card.dataFormatted = this.formatData(response.data.data);
          this.originalCard = { ...response.data };
        })
        .catch(error => {
          console.error('Error fetching card:', error);
        });
    },
    onInputChange() {
      this.card.data = this.parseData(this.card.dataFormatted);
      this.isModified = JSON.stringify(this.card) !== JSON.stringify(this.originalCard);
    },
    save() {
      axios.put(`https://api.restful-api.dev/objects/${this.card.id}`, this.card)
        .then(() => {
          this.originalCard = { ...this.card };
          this.isModified = false;
          this.showSaveNotification = true; 
          setTimeout(() => {
            this.showSaveNotification = false; 
          }, 3000);
        })
        .catch(error => {
          console.error('Error saving card:', error);
        });
    },
    discard() {
      this.card = { ...this.originalCard };
      this.card.dataFormatted = this.formatData(this.originalCard.data);
      this.isModified = false;
    },
    deleteCard() {
      if (confirm('Are you sure you want to delete this card?')) {
        axios.delete(`https://api.restful-api.dev/objects/${this.card.id}`)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.error('Error deleting card:', error);
          });
      }
    },
    formatData(data) {
      if (!data) return '';
      return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
    },
    parseData(dataFormatted) {
      const data = {};
      dataFormatted.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        if (key) data[key] = value;
      });
      return data;
    }
  }
};
</script>

<style scoped>
input, textarea {
  display: block;
  margin: 8px 0;
  padding: 8px;
  width: 100%;
}
button {
  margin: 8px 8px 8px 0;
}
.home-button {
  margin-top: 10px;
  display: inline-block;
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
.home-button:hover {
  background-color: #0056b3;
}
.save-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 9999;
  animation: fadeOut 3s ease;
}
@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
