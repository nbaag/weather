<template>
  <myHeader/>
  <main>
    <div class="container">
      <div class="current_data">
        <p style="font-weight: bold; font-size: 20px; margin-bottom: 6px">{{ currentWeather.city }}</p>
        <h1>{{ currentDate.getDate() + ' ' + currentDate.toLocaleDateString('en-us', {month:'short'}) }}</h1>
        <p class="text">Today</p>
        <img :src="currentWeather.image" alt="weather_icon">
        <p class="weather"> {{ currentWeather.temperature }}° C </p>
        <p class="description"> {{ currentWeather.description }} </p>
      </div>
    </div>
    <div class="daily_weather">
      <div class="mini_container" v-for="weather in weeklyWeather" :key="weather">
      <h2 style="font-size: 20px">{{ weather.dayNumber + ' ' + weather.month }}</h2>
      <p class="text">{{ weather.dayName }}</p>
      <img style="max-width: 80px" :src="weather.image" alt="">
      <p>Day: {{ weather.temperatureDay }}° C</p>
      <p>Night: {{ weather.temperatureNight }}° C</p>
      </div>
    </div>
  </main>
</template>

<script>
  import myHeader from '@/components/my-header.vue'
  export default {
    components: {
      myHeader
    },
    data() {
      return {
        key: '5fdf0fb76d7ff76f97ae88bd07a28c1b',
        currentWeather: {
          temperature: '-',
          description: '-',
          city: '-',
          image: 'src/icons/unknown.png'
        },
        weeklyWeather: [],
        kelvin: 273,
        currentDate: new Date(),
        days: []
      }
    },

    mounted() {
      this.getUserLocation()
    },

    methods: {
      getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;

          this.getWeather(latitude, longitude);
        })
      },

      getWeather(latitude, longitude) {
        let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${this.key}`

        fetch(api)
          .then((response) => {
            let data = response.json();
            return data;
          })
          .then((data) => {
            this.currentWeather.temperature = Math.floor(data.current.temp - this.kelvin);
            this.currentWeather.city = data.timezone;
            this.currentWeather.description = data.current.weather[0].description.toUpperCase()
            this.currentWeather.image = `src/icons/${data.current.weather[0].icon}.png`

            this.getDate()

            for(let i = 0; i < 6; i++) {
              let weather = {temperatureDay: '', temperatureNight: '', image: '', dayNumber:'', dayName: '', month: ''}
              weather.temperatureDay = Math.floor(data.daily[i + 1].temp.day - this.kelvin);
              weather.temperatureNight = Math.floor(data.daily[i + 1].temp.night - this.kelvin);
              weather.image = `src/icons/${data.daily[i + 1].weather[0].icon}.png`
              weather.dayNumber = this.days[i].number;
              weather.dayName = this.days[i].name;
              weather.month = this.days[i].month;
              this.weeklyWeather.push(weather);
            }
          })
        
        console.log(api)
      },

      getDate() {
        for(let i = 1; i < 7; i++) {
          let newDay = {number: '', name: '', month: ''};
          let tomorrow = new Date(this.currentDate)
          tomorrow.setDate(tomorrow.getDate() + i)
          newDay.number = tomorrow.getDate()
          newDay.name = tomorrow.toLocaleDateString('en-us', {weekday:'long'})
          newDay.month = tomorrow.toLocaleDateString('en-us', {month:'short'})
          this.days.push(newDay)
          console.log()
        }
      }
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: lightblue;
  font-family: Arial, Helvetica, sans-serif;
}

h1, h2{
  margin: 4px;

}

.text {
  margin: 8px 0;
}
.weather {
  font-weight: bold;
  font-size: 25px;
}
.container {
  background-color: #fff;
  min-width: 143px;
  max-width: 250px;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: auto;
  border: 2px solid blue;
  border-radius: 20px;
}
.mini_container {
  background-color: #fff;
  display: inline-block;
  padding: 10px 0;
  width: 130px;
  align-items: center;
  text-align: center;
  margin: 10px 4px;
  border: 2px solid blue;
  border-radius: 20px;
}

.daily_weather {
  margin: auto;
  align-items: center;
  text-align: center;
}
</style>