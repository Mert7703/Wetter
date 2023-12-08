<!-- 
  Diese Vue.js-Komponente stellt eine Liste von Wettervorhersagen für die nächsten Tage dar.
  Die Vorhersagen werden vom OpenWeatherMap-API abgerufen und dargestellt.
-->
<template>
    <div class="days-tab text-center">
      <!-- Anzeige während des Ladens -->
      <div v-if="loading" class="loading">Loading...</div>
      
      <!-- Liste mit Wettervorhersagen -->
      <ul v-else class="p-0">
        <!-- Iteration über jede Wettervorhersage für einen Tag -->
        <li v-for="day in forecast" :key="day.date" class="li_active">
          <!-- Symbol für das Wetter -->
          <div class="py-3"><img :src="day.iconUrl" alt="Weather Icon"></div>
          
          <!-- Name des Tages -->
          <div class="py-3">{{ getDayname(day.date) }}</div>
          
          <!-- Temperatur für den Tag -->
          <div class="py-3">{{ day.temperature }}°C</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';
  
  export default {
    // Prop zur Angabe des Stadtnamens
    props: {
      cityname: String,
    },
    data() {
      // Daten für die Komponente: Vorhersage und Ladezustand
      return {
        forecast: [],   // Array für die Wettervorhersagen
        loading: true,  // Ladezustand
      };
    },
    mounted() {
      // Beim Laden der Komponente die Wetterdaten abrufen
      this.fetchWeatherData();
    },
    methods: {
      // Methode zum Abrufen von Wetterdaten vom OpenWeatherMap-API
      async fetchWeatherData() {
        const apiKey = '8407caf2c5833bddea5f4e3c0b09a888';
        const city = this.cityname;
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
        try {
          // API-Aufruf und Verarbeitung der Wetterdaten
          const response = await axios.get(apiUrl);
          const forecastData = response.data.list;
          const filteredData = forecastData
            .map(item => ({
              date: moment(item.dt_txt.split(' ')[0]),
              temperature: Math.round(item.main.temp),
              description: item.weather[0].description,
              iconUrl: `https://api.openweathermap.org/img/w/${item.weather[0].icon}.png`,
            }))
            .reduce((acc, item) => {
              // Filtern der Daten auf einzigartige Tage und Begrenzung auf die nächsten 4 Tage
              if (!acc.some(day => day.date.isSame(item.date, 'day'))) {
                acc.push(item);
              }
              return acc;
            }, [])
            .slice(1, 5);
  
          // Aktualisieren der Vorhersage-Daten in der Komponente
          this.forecast = filteredData;
          console.log(filteredData, 'working');
        } catch (error) {
          // Fehlerbehandlung bei fehlgeschlagenem API-Aufruf
          console.error('Error fetching weather data: ', error);
        } finally {
          // Deaktivieren des Ladezustands, unabhängig vom Erfolg des API-Aufrufs
          this.loading = false;
        }
      },
      // Methode zum Abrufen des Tagesnamens aus einem Moment.js-Datumsobjekt
      getDayname(date) {
        return date.format('ddd');
      }
    },
  };
  </script>
  
  
    
    <style>
.days-tab {
    width: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 20px;
    width: 90%;
    margin: auto;

}

.loading {
    color: #fff;
}
ul {
    margin: 0;
}

li {
    display: inline-block;
    list-style: none;
    height: 100%;
    width: 21%;
    max-width: 21%;
    font-size: 1vw;
    line-height: 1.2;
}

span {
    display: block;
    margin-bottom: 5px;
    font: 100% sans-serif;
    height: 35px;
}

.li_active {
    background: #253d5c;
    color: #222831;
    border-radius: 10px;
    margin: 0.5rem;
    color: #fff;
    font-weight: 600;
}

.li_active:hover {
    transform: scale(1.2);
    transition: transform 0.1s ease;
}

.li_active_temp {
    display: inline-block;
    background-color: #222831;
    color: #ffffff;
    transition: background-color 0.5s;
    border-radius: 10px;
}
 
.li_active_temp:hover {
    transform: scale(1.2);
    transition: transform 01.s ease;
    background: #fff;
    border-radius: 10px;
    color: #191a1f;
}
    
    </style>
    