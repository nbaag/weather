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
  getters: {
    
  },
  mutations: {
    getDate(state) {
      for(let i = 1; i < 7; i++) {
        let newDay = {number: '', name: '', month: ''};
        let tomorrow = new Date(state.currentDate)
        tomorrow.setDate(tomorrow.getDate() + i)
        newDay.number = tomorrow.getDate()
        newDay.name = tomorrow.toLocaleDateString('en-us', {weekday:'long'})
        newDay.month = tomorrow.toLocaleDateString('en-us', {month:'short'})
        state.days.push(newDay)
        console.log(newDay)
      }
    }
  },
  actions: {
    
    getWeather({ commit, state }) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${state.key}`)
        .then(response => {
          
          state.currentWeather.temperature = Math.floor(response.data.current.temp - state.kelvin);
          state.currentWeather.city = response.data.timezone;
          state.currentWeather.description = response.data.current.weather[0].description.toUpperCase();
          state.currentWeather.image = `src/icons/${response.data.current.weather[0].icon}.png`;

          commit('getDate')
          
          if(state.weeklyWeather.length < 6) {
            for(let i = 0; i < 6; i++) {
              let weather = {temperatureDay: '', temperatureNight: '', image: '', dayNumber:'', dayName: '', month: ''}
              weather.temperatureDay = Math.floor(response.data.daily[i + 1].temp.day - state.kelvin);
              weather.temperatureNight = Math.floor(response.data.daily[i + 1].temp.night - state.kelvin);
              weather.image = `src/icons/${response.data.daily[i + 1].weather[0].icon}.png`
              weather.dayNumber = state.days[i].number;
              weather.dayName = state.days[i].name;
              weather.month = state.days[i].month;
              state.weeklyWeather.push(weather);
            }
          }
          
        })
      })
      
    },
    
  }
})

export default store;
