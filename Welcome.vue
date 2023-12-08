<!-- Welcome.vue -->

<template>
    <div class="welcome-page">
      <h1>Welcome to My Weather App!</h1>
      <p>Click the button below to start exploring the weather.</p>
      <button @click="goToMainPage">Explore</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToMainPage() {
        // Hier kannst du zur Hauptseite navigieren, z.B. mit Vue Router
        this.$router.push({ name: 'myWeather' }); // Beachte, dass dies von deinen Routennamen abhängt
      }
    }
  };
  </script>
  
  <style scoped>
  /* Hier kannst du CSS-Stile für deine Willkommensseite hinzufügen */
  .welcome-page {
    text-align: center;
    margin: 50px;
  }
  </style>
  