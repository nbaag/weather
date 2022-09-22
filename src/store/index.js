import axios from 'axios';
import { createStore } from 'vuex';


const store = createStore({
  state() {
    return {
      key:'5fdf0fb76d7ff76f97ae88bd07a28c1b',
      currentWeather: {
        temperature: '-',
        description: '-',
        city: '-',
        image: 'src/icons/unknown.png'
      },
      weeklyWeather: [],
      kelvin: 273,
      currentDate: new Date(),
      days: [],
      lat: '',
      lon: ''
    }
  },
  mutations: {
    getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.state.lat = position.coords.latitude;
        this.state.lon = position.coords.longitude;

        console.log(this.state.lat, this.state.lon)
      })
    },
    getDate() {
      for(let i = 1; i < 7; i++) {
        let newDay = {number: '', name: '', month: ''};
        let tomorrow = new Date(this.state.currentDate)
        tomorrow.setDate(tomorrow.getDate() + i)
        newDay.number = tomorrow.getDate()
        newDay.name = tomorrow.toLocaleDateString('en-us', {weekday:'long'})
        newDay.month = tomorrow.toLocaleDateString('en-us', {month:'short'})
        this.state.days.push(newDay)
        console.log(newDay)
      }
    }
  },
  actions: {
    getWeather() {

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely,hourly&appid=${this.state.key}`)
      .then(response => {
        this.state.currentWeather.temperature = Math.floor(response.data.current.temp - this.state.kelvin);
        this.state.currentWeather.city = response.data.timezone;
        this.state.currentWeather.description = response.data.current.weather[0].description.toUpperCase();
        this.state.currentWeather.image = `src/icons/${response.data.current.weather[0].icon}.png`;

        this.commit('getDate')

        for(let i = 0; i < 6; i++) {
          let weather = {temperatureDay: '', temperatureNight: '', image: '', dayNumber:'', dayName: '', month: ''}
          weather.temperatureDay = Math.floor(response.data.daily[i + 1].temp.day - this.state.kelvin);
          weather.temperatureNight = Math.floor(response.data.daily[i + 1].temp.night - this.state.kelvin);
          weather.image = `src/icons/${response.data.daily[i + 1].weather[0].icon}.png`
          weather.dayNumber = this.state.days[i].number;
          weather.dayName = this.state.days[i].name;
          weather.month = this.state.days[i].month;
          this.state.weeklyWeather.push(weather);
        }
      })
    },
    
  }
})

export default store;
