<template>
  <div class="app">
    <!-- Navigation-Komponente -->
    <Navigation/>
    <!-- Router-View für die Darstellung verschiedener Seiten -->
    <router-view />
    <!-- Header-Bereich mit Suchleiste, Schaltflächen und Suchhistorie -->
    <div class="header container h-100 p-5">
      <h1 class="mb-5">Weather App</h1>
      <!-- Suchleiste -->
      <div class="d-flex justify-content-center align-items-center">
        <div class="searchbar w-50">
          <!-- Eingabefeld für die Stadt -->
          <input
            type="text"
            class="input form-control"
            v-model="city"
            placeholder="Enter a City"
          />
          <!-- Schaltfläche zum Löschen des Eingabefelds -->
          <button v-if="city.length > 0" class="clear-btn" @click="clearInput">X</button>
        </div>
        <!-- Schaltflächen für die Wetterabfrage und Historielöschung -->
        <button class="btn-search btn btn-primary ml-3" @click="searchWeather">Search <i class="fas fa-search"></i></button>
        <button class="btn-clear-history btn btn-danger ml-3" @click="clearHistory">Clear History</button>
      </div>
      <!-- Anzeige der Suchhistorie -->
      <div class="search-history mt-4">
        <p class="mb-2">Search History:</p>
        <ul class="list-group">
          <!-- Liste der Suchhistorie mit Schaltflächen zum Auswählen und Löschen -->
          <li v-for="(item, index) in searchHistory" :key="index" class="list-group-item">
            <button class="btn btn-link" @click="selectFromHistory(item)">{{ item }}</button>
            <span class="ml-2 text-danger" @click="removeFromHistory(index)">X</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- Wetter-Komponente, die nur angezeigt wird, wenn showWeather true ist -->
    <Weather :city="city" v-if="showWeather"></Weather>
  </div>
</template>

<script>
import Weather from './components/Weather.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Weather,
    Navigation
  },
  data() {
    // Daten für die Komponente (Stadt, Anzeige des Wetters, Suchhistorie)
    return {
      city: '',
      showWeather: false,
      searchHistory: [] // Array zur Speicherung der Suchhistorie
    };
  },
  methods: {
    // Methode zur Wetterabfrage
    async searchWeather() {
      this.showWeather = false;
      await this.$nextTick();
      this.showWeather = true;

      // Stadt zur Suchhistorie hinzufügen
      if (this.city && !this.searchHistory.includes(this.city)) {
        this.searchHistory.unshift(this.city);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      }
    },
    // Methode zum Löschen der Eingabe
    clearInput() {
      this.city = '';
    },
    // Methode zum Auswählen aus der Suchhistorie
    selectFromHistory(item) {
      this.city = item;
    },
    // Methode zum Löschen eines Elements aus der Suchhistorie
    removeFromHistory(index) {
      this.searchHistory.splice(index, 1);
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    },
    // Methode zum Löschen der gesamten Suchhistorie
    clearHistory() {
      this.searchHistory = [];
      localStorage.removeItem('searchHistory');
    }
  },
  // Beim Laden der Komponente wird die Suchhistorie aus dem localStorage geladen
  mounted() {
    const storedHistory = localStorage.getItem('searchHistory');
    this.searchHistory = storedHistory ? JSON.parse(storedHistory) : [];
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  background-color: #343a40;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  padding-top: 80px; /* Adjust the top padding */
  margin-top: 10px;
}

.header h1 {
  margin-top: 50px; /* Adjust the top margin */
}

.btn-search {
  background-image: linear-gradient(to right, #17a2b8, #007bff);
}

.searchbar {
  display: flex;
  position: relative;
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #495057;
  cursor: pointer;
  display: none;
}

/* Show the clear button when there is text in the input */
.searchbar input:focus + .clear-btn {
  display: block;
}

.search-history {
  margin-top: 20px;
}

.search-history ul {
  list-style: none;
  padding: 5px;
}

.search-history li {
  margin-bottom: 5px;
}

.search-history button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

/* Additional styling for list group items */
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>





