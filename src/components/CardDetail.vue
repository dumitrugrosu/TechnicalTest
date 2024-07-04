<template>
    <div>
      <h2>Edit Card</h2>
      <input v-model="card.name" placeholder="Name" @input="onInputChange" />
      <textarea v-model="card.dataFormatted" placeholder="Data" @input="onInputChange"></textarea>
      <button @click="save" :disabled="!isModified">Save</button>
      <button @click="discard" :disabled="!isModified">Discard</button>
      <button @click="deleteCard">Delete</button>
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
          data: {}
        },
        originalCard: {},
        isModified: false
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
  </style>
  