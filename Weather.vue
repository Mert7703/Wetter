<!-- 
  Die Vue.js-Komponente wird in drei Hauptbereiche unterteilt:
  1. Aktuelle Wetterinformationen
  2. Zusätzliche Wetterinformationen
  3. Formular zum Ändern des Standorts
-->
<template>
    <div class="container p-0">
      <!-- Hauptbereich: Aktuelle Wetterinformationen -->
      <div class="d-flex">
        <div class="card main-div w-100">
          <div class="p-3">
            <!-- Überschrift für den aktuellen Tag -->
            <h2 class="mb-1 day">Today</h2>
            <!-- Anzeige des Datums und der Uhrzeit -->
            <p class="text-light date mb-0">{{ date }}</p>
            <small>{{ time }}</small>
            <!-- Ort und Land des Wetters -->
            <h2 class="place">
              <i class="fa fa-location">{{ name }} <small> {{ country }} </small> </i>
            </h2>
            <!-- Temperatur und Wetterbeschreibung mit Symbol -->
            <div class="temp">
              <h1 class="weather-temp">{{ temperature }}&deg;</h1>
              <h2 class="text-light">{{ description }} <img :src="iconUrl" alt="Weather icon"></h2>
            </div>
          </div>
        </div>
  
        <!-- Hauptbereich: Zusätzliche Wetterinformationen -->
        <div class="card card-2 w-100">
          <!-- Tabelle für Sea Level, Luftfeuchtigkeit und Wind -->
          <table class="m-4">
            <tbody>
              <tr>
                <th>Sea Level</th>
                <td v-if="sea_level > 0">{{ sea_level }}</td>
                <td v-else>null</td>
              </tr>
              <tr>
                <th>Humidity</th>
                <td>{{ humidity }}</td>
              </tr>
              <tr>
                <th>Wind</th>
                <td>{{ wind }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Eingebundene DaysWeather-Komponente für die Wettervorhersage -->
          <DaysWeather :cityname="cityname"></DaysWeather>
  
          <!-- Formular zum Ändern des Standorts -->
          <div id="div_Form" class="d-flex m-3 justify-container">
            <form action="">
              <input type="button" value="Change Location" @click="changeLocation" class="btn change_btn btn-primary">
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import DaysWeather from './DaysWeather.vue';
  
  export default (await import('vue')).defineComponent({
    name: 'myWeather',
    components: {
      DaysWeather,
    },
    props: {
      city: String,
    },
    data() {
      // Daten für die Komponente
      return {
        cityname: this.city,
        temperature: null,
        description: null,
        iconUrl: null,
        date: null,
        time: null,
        name: null,
        sea_level: null,
        wind: null,
        humidity: null,
        country: null,
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      };
    },
    methods: {
      // Methode zum Aktualisieren der Seite und Ändern des Standorts
      changeLocation() {
        window.location.reload();
      }
    },
    async created() {
      // Bei der Erstellung der Komponente werden die Wetterdaten geladen
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=8407caf2c5833bddea5f4e3c0b09a888`);
      const weatherData = response.data;
  
      // Zuweisung der Wetterdaten an die Daten der Komponente
      this.temperature = Math.round(weatherData.main.temp);
      this.description = weatherData.weather[0].description;
      this.name = weatherData.name;
      this.wind = weatherData.wind.speed;
      this.sea_level = weatherData.main.sea_level;
      this.country = weatherData.sys.country;
      this.humidity = weatherData.main.humidity;
  
      this.iconUrl = `https://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const d = new Date();
      this.date = d.getDate() + '-' + this.monthNames[d.getMonth()] + '-' + d.getFullYear();
      this.time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      console.log(weatherData);
    }
  });
  </script>
  
    
    <style>
    
    body{
    background-color: #3e4550 !important;

}

.weather-temp {
    margin: 0;
    font-weight: 700;
    font-size: 4em;
    color: #fff;
}

h2.mb-1.day {
    font-size: 3rem;
    font-weight: 400;
}

.main-div {
    margin-top: 10px;
    border-radius: 30px;
    background-image: url("~@/assets/Wetter.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}

.temp {
    position: absolute;
    bottom: 0;

}

.main-div:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease;
    z-index: 1;
}

.card-2 {
    margin-top: 10px;
    background-color: #212730 !important;
    background-image: none; 
    border-radius: 20px;
}


.card-details {
    margin-left: 19px;

}

.h1_left {
    position: absolute;
    bottom: 25px;
    left: 16px;
    font-size: 3vw;
    line-height: 1.2;

}

.h3_left {
    position: absolute;
    left: 16px;
    font-size: 2vw;
    line-height: 0.5;


}

.h3_left small {
    font-size: 1rem;
}

table {
    position: relative;
    left: 15px;
    border-collapse: separate;
    border-spacing: 15px;
    width: 85%;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;

}

th,
td {
    font-size: 18px;
    color: #fff;
}

td {
    text-align: right;
}

table,
tr:hover {
    color: red;
}

.change_btn {
    background-image: linear-gradient(to right, blue, rgb(114, 112, 116));
}

.change_btn:hover {
    transform: scale(0.9);
    transition: transform 0.1s ease;
}



    </style>