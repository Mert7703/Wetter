<template>
    <div>
      <p>Willkommen auf unserer Landingpage!</p>
      <button @click="navigateToMain">Zur Hauptseite</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToMain() {
        this.$router.push({ name: 'main' }); // Hier muss der Name deiner Hauptseite sein
      },
    },
  };
  </script>
  
  <style scoped>
    div {
      text-align: center;
      margin-top: 60px;
    }
  
    p {
      font-size: 18px;
      margin-bottom: 20px;
    }
  
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>