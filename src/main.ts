import Vue from 'vue'
import App from './App.vue'

// Stylesheets
import './assets/styles/entry.scss'

// Webfontloader
const webfont = require('webfontloader')
webfont.load({
  google: {
    families: [
      'Roboto Mono', 'Source Code Pro', 'IBM Plex Mono', 'Open Sans', 'Ubuntu Mono', 'Space Mono',
      'Montserrat', 'Source Sans Pro', 'Raleway', 'Poppins'
    ]
  }
})

// Octicons
const octicons = require('@primer/octicons')
Vue.prototype.$octicons = octicons

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
