<template>
  <div>
    <!-- today's weather -->
    <div class="container">
      <div class="current_data">
        <p style="font-weight: bold; font-size: 20px; margin-bottom: 6px">{{ $store.state.currentWeather.city }}</p>
        <h1>{{ $store.state.currentDate.getDate() + ' ' + $store.state.currentDate.toLocaleDateString('en-us', {month:'short'}) }}</h1>
        <p class="text">Today</p>
        <img :src="$store.state.currentWeather.image" alt="weather_icon">
        <p class="weather"> {{ $store.state.currentWeather.temperature }}° C </p>
        <p class="description"> {{ $store.state.currentWeather.description }} </p>
      </div>
    </div> 
    <!-- week's weather -->
    <div class="daily_weather">
      <div class="mini_container" v-for="weather in $store.state.weeklyWeather" :key="weather.dayNumber">
      <h2 style="font-size: 20px">{{ weather.dayNumber + ' ' + weather.month }}</h2>
      <p class="text">{{ weather.dayName }}</p>
      <img style="max-width: 80px" :src="weather.image" alt="">
      <p>Day: {{ weather.temperatureDay }}° C</p>
      <p>Night: {{ weather.temperatureNight }}° C</p>
      </div>
    </div>
  </div>
</template>

<script>
import{ mapState, mapMutations, mapActions} from 'vuex'

  export default {
    methods: {
      ...mapMutations([
        'getUserLocation'
      ]),
      ...mapActions([
        'getWeather'
      ])
    },

    mounted() {
      this.getWeather()
      
    }
  }
</script>

<style lang="scss" scoped>
  $blueborder: 2px solid blue;
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
  border: $blueborder;
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
  border: $blueborder;
  border-radius: 20px;
}

.daily_weather {
  margin: auto;
  align-items: center;
  text-align: center;
}
</style>
